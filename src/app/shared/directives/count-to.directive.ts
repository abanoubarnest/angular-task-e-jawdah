import { Directive, OnChanges, ElementRef, Input, OnInit } from '@angular/core';
/*
 usage for simulation count-the-number-of-elements-selected-in-a-directive
 how to use 
   <span  [CountTo]="item.data" [from]="0"
                  [duration]="1">
                   {{item.data}}
                  </span>
                  @params duration and @ form are optionals 
*/

@Directive({
  selector: '[CountTo]'
})
export class CountToDirective implements OnChanges, OnInit {
  @Input()
  CountTo: number;
  @Input()
  from = 0;
  @Input()
  duration = 4;

  currentElement = this.el.nativeElement;
  num: number;
  refreshInterval = 30;
  steps: number;
  step = 0;
  increment: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.CountTo) {
      this.start();
    }
  }

  calculateDuration() {
    this.duration = this.duration * 1000;

    this.steps = Math.ceil(this.duration / this.refreshInterval);
    this.increment = ((this.CountTo - this.from) / this.steps);
    this.num = this.from;
  }

  tick() {
    setTimeout(() => {
      this.num += this.increment;
      this.step++;
      if (this.step >= this.steps) {
        this.num = this.CountTo;
        this.currentElement.textContent = this.CountTo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      } else {
        this.currentElement.textContent = Math.round(this.num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Math.round(this.num);
        this.tick();
      }
    }, this.refreshInterval);
  }

  start() {
    this.calculateDuration();
    this.tick();
  }
}
