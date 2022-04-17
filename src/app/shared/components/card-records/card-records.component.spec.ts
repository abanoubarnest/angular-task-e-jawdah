import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecordsComponent } from './card-records.component';

describe('CardRecordsComponent', () => {
  let component: CardRecordsComponent;
  let fixture: ComponentFixture<CardRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
