import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Elements, ElementsOptions, Element as StripeElement, StripeService } from 'ngx-stripe';
import { switchMap } from 'rxjs';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  // elements: Elements;
  // card: StripeElement;
 
  // // optional parameters
  // elementsOptions: ElementsOptions = {
  //   locale: 'es'
  // };
  tourId: any;
  stripeTest: FormGroup;
 user:any;
  constructor(
    private fb: FormBuilder,
    // private stripeService: StripeService,
    public router: Router,
    public tourService: TourService, public route: ActivatedRoute) {}
    ngOnInit(){}
  // ngOnInit() {
  //   this.user =  JSON.parse(localStorage.getItem('userDetails')|| '{}');
  //   this.stripeTest = this.fb.group({
  //     name: ['', [Validators.required]]
  //   });
  //   this.route.queryParams.subscribe((param:any)=> {
  //     this.tourId =  param['tourId'];
  //     });
  //   this.stripeService.elements(this.elementsOptions)
  //     .subscribe(elements => {
  //       this.elements = elements;
  //       // Only mount the element the first time
  //       if (!this.card) {
  //         this.card = this.elements.create('card', {
  //           style: {
  //             base: {
  //               iconColor: '#666EE8',
  //               color: '#31325F',
  //               lineHeight: '40px',
  //               fontWeight: 300,
  //               fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //               fontSize: '18px',
  //               '::placeholder': {
  //                 color: '#CFD7E0'
  //               }
  //             }
  //           }
  //         });
  //         this.card.mount('#card-element');
  //       }
  //     });
  // }
 
  // buy() {
  //   const name = this.stripeTest.value.name;
  //   this.stripeService
  //     .createToken(this.card, { name })
  //     .subscribe(result => {
  //       if (result.token) {
  //        let  data = {
  //           tourId: this.tourId, token: result.token
  //         }
  //         this.tourService.bookTour(data).pipe(switchMap(response=> {
  //             let data = {
  //               tourId :  this.tourId,
  //               userId:  this.user._id,
  //               price: 8000
  //             }
  //           return this.tourService.createBookings(data);
  //         })).subscribe({next:res => {
  //           if(res.status === 'Success') {
  //             this.router.navigate(['/overView'])
  //           }
  //        }, error: err => {
  //         console.log(err);
  //        }
  //        });
  //       } else if (result.error) {
  //         // Error creating the token
  //         console.log(result.error.message);
  //       }
  //     });
  // }

}
