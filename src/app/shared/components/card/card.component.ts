import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../../models/card';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
 @Input() cardList:Card[]=[]
 @Input() title="";
  constructor() { }

  ngOnInit(): void {
  }

}
