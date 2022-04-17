import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardRecord } from '../../models/cardRecord';

@Component({
  selector: 'app-card-records',
  templateUrl: './card-records.component.html',
  styleUrls: ['./card-records.component.scss']
})
export class CardRecordsComponent implements OnInit {
  @Output() actionMenu: EventEmitter<any> = new EventEmitter<any>();
  @Output() showRecords: EventEmitter<any> = new EventEmitter<any>();
  @Input() records: CardRecord[] = [
  ];
  constructor() { }

  ngOnInit(): void {
  }
  handleAction(event: any) {
    this.actionMenu.emit(event);
  }
  Show(event: any) {
    this.showRecords.emit(event);
  }
}

