import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent implements OnInit {
 tourList:any;
  constructor(private tourService: TourService) { }

  ngOnInit(){
    this.loadData();
  }

  loadData() {
    this.getTourList()
  }

  getTourList(){
   this.tourService.getTourList().subscribe({next:res => {
      if(res.status === 'Success') {
        this.tourList = res.data
      }
   }, error: err => {
    console.log(err);
   }
   });
  }

}
