import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  data: any;
  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data['subscribe']((response: any) => {
      response.bookData['subscribe']((res: any) => {
        if(res){
          this.data=res;
        }
        else{
          this.data="No data" 
        }
      });
      console.log('PRODUCT FETCHED');
    });
  }

}
