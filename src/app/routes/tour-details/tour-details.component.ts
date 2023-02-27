import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import { Marker } from '../../models/marker.model';
@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss']
})
export class TourDetailsComponent implements OnInit {

  constructor(public route: ActivatedRoute, public tourService: TourService) { }
tourId: any;
tourDetails: any;
 guides=[];
 zoom: number = 8;

  // initial center position for the map
  lat: number = 77.059723;
  lng: number = 10.089167;

  markers: Marker[] = [];
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
   this.route.queryParams.subscribe(param=> {
    this.tourId =  param['tourId'];
    if(this.tourId){
      this.getTour();
    }
    });
  }

  getTour() {
   this.tourService.getTour(this.tourId).subscribe({next:res => {
    if(res.status === 'Success') {
      this.tourDetails = res.data;
      this.guides = res.data.guides;
      this.loadMarker();
    }
 }, error: err => {
  console.log(err);
 }
 });
}

loadMarker() {
  if(this.tourDetails && this.tourDetails.location){
    this.tourDetails.location.forEach( (point:any)=> {
        if(point.coordinates) {
    this.markers.push({
        lat: point.coordinates[1],
        lng: point.coordinates[0],
        label: point.description,
        draggable: false,
        content: "InfoWindow content",
        color: "blue",
        iconUrl: "https://img.icons8.com/material-outlined/2x/marker.png"
      },
    );
        } 
    });
  }
}
}
