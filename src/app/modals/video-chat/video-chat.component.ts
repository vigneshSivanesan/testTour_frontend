import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent implements OnInit {
  // localVideo:any;
  // @ViewChild('remote-video') remoteVideo: ElementRef;
  // @ViewChild('local-video') localVideo: ElementRef;
  localVideo:any;
  remoteVideo:any;
  offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  };
  inCall =  false;
  localVideoActive = false;
  peerConnection: RTCPeerConnection;
  localStream: MediaStream;
  userIds: any;
  rtcPeerConfig =    {
    iceServers: [
      {
        urls: 'stun:stun1.l.google.com:19302'
      }
    ]
  }
   mediaConstraints = {
    audio: true,
    video: {width: 1280, height: 720}
    // video: {width: 1280, height: 720} // 16:9
    // video: {width: 960, height: 540}  // 16:9
    // video: {width: 640, height: 480}  //  4:3
    // video: {width: 160, height: 120}  //  4:3
  };

  constructor(public activeModal: NgbActiveModal, public chatService: ChatService) { 
    this.receiveRTCMessage();
  }

  ngOnInit(): void {
    this.loadVideo();
  }

  async loadVideo() {
    // let stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});

    // this.localVideo =  document.getElementById("local-video");
    // if(this.localVideo){
    // this.localVideo.srcObject = stream;
    // console.log(this.localVideo);
    // }
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(this.mediaConstraints);
      // pause all tracks
      this.startLocalVideo();
    } catch (e) {
      console.error(e);
      // alert(`getUserMedia() error: ${e.name}`);
    }
  }

  close() {
    this.activeModal.close();
  }

  async call(){
    this.createPeerConnection();

    this.localStream.getTracks().forEach(async (track) => {
       await this.peerConnection.addTrack(track,this.localStream);
    });
 try{
    const offer: RTCSessionDescriptionInit =  await this.peerConnection.createOffer(this.offerOptions);
    await this.peerConnection.setLocalDescription(offer);
    this.inCall = true;
    this.chatService.sendRTCMessage({type:'offer',data:offer,users:this.userIds});
 }

  catch(e){
    console.log(e);
  }
  }

  createPeerConnection() {
    this.peerConnection =  new RTCPeerConnection(this.rtcPeerConfig);
     this.peerConnection.onicecandidate =  this.handleIceCandidateEvent;
     this.peerConnection.oniceconnectionstatechange = this.handleIceConnectionStateChangeEvent;
     this.peerConnection.onsignalingstatechange =  this.handleSignalStateChangeEvent;
     this.peerConnection.ontrack =  this.handleTrackEvent;
  }

  receiveRTCMessage() {
    this.chatService.receiveRTCMessage().subscribe(res =>{
          if(res.type && res.data){
            if(res.type === 'offer'){
              this.handleOfferMessage(res.data);
            } else if(res.type === 'answer'){
              this.handleAnswerMessage(res.data);
            } else if(res.type === 'iceCandidate'){
              this.handleICECandidateMessage(res.data);
            }
          }
    });
  }

  async handleICECandidateMessage(msg: RTCIceCandidate) {
    const candidate = new RTCIceCandidate(msg);
    await this.peerConnection.addIceCandidate(candidate).catch();
  }

 async  handleAnswerMessage(msg:RTCSessionDescriptionInit){
    await this.peerConnection.setRemoteDescription(msg);
  }

  handleOfferMessage(msg:RTCSessionDescriptionInit){
    if(!this.peerConnection){
      this.createPeerConnection();
    }
    if(!this.localStream){
      this.startLocalVideo();
    }

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(msg)).then(res=>{
        this.localVideo =  document.getElementById("local-video");
        this.localVideo.srcObject = this.localStream;

        this.localStream.getTracks().forEach(async (track) => 
          await this.peerConnection.addTrack(track, this.localStream)
        )
    }).then(async ()=>{
     return  await this.peerConnection.createAnswer();
  }).then(async (answer)=>{
      return await this.peerConnection.setLocalDescription(answer);
  }).then(()=>{
    this.chatService.sendRTCMessage({type:'answer', data: this.peerConnection.localDescription});
    this.inCall =  true;
  });
  }


  startLocalVideo(): void {
    console.log('starting local stream');
    this.localStream.getTracks().forEach(track => {
      track.enabled = true;
    });
      this.localVideo =  document.getElementById("local-video");
    if(this.localVideo){
     this.localVideo.srcObject = this.localStream;
    console.log(this.localVideo);
    // this.localVideo.nativeElement.srcObject = ;
    }
    this.localVideoActive = true;
  }

  pauseLocalVideo(): void {
    console.log('pause local stream');
    this.localStream.getTracks().forEach(track => {
      track.enabled = false;
    });
    this.localVideo.nativeElement.srcObject = undefined;

    this.localVideoActive = false;
  }


  closeVideoCall(){
    if(this.peerConnection){
      this.peerConnection.onicecandidate =  null;
      this.peerConnection.oniceconnectionstatechange =  null;
      this.peerConnection.onsignalingstatechange =  null;
      this.peerConnection.ontrack =  null;
// Stop all transceivers on the connection
      this.peerConnection.getTransceivers().forEach(receviers=>{
        receviers.stop();
      });

           // Close the peer connection
           this.peerConnection.close();
           this.inCall = false;

    }
  }

//Events
  private handleIceCandidateEvent = (event: RTCPeerConnectionIceEvent) =>{

    if(event.candidate){
      this.chatService.sendRTCMessage({type:'iceCandidate',data:event.candidate, users:this.userIds})
    }

  }

  private handleIceConnectionStateChangeEvent = (event:Event)=>{

   switch (this.peerConnection.iceConnectionState){
     case 'failed':
     case 'closed':
     case 'disconnected':
     this.closeVideoCall();
     break;
   }
  }

  private handleSignalStateChangeEvent = (event: Event)=> {
    switch(this.peerConnection.signalingState) {

      case 'closed':
        this.closeVideoCall();
        break;
    }
  }

  private  handleTrackEvent = (event: RTCTrackEvent) => {
  //  this.remoteVideo.nativeElement.srcObject = event.streams[0];
   this.remoteVideo =  document.getElementById("remote-video");
   this.remoteVideo.srcObject = event.streams[0];
  }

}
