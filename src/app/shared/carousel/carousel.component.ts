import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() images: any[] = [];
  @Input() maxWidth: string = '100%';
  @Input() maxHeight: string = '100%';
  @Input() height: string = '100%';
  @Input() interval?: number;
  @Input() showControls: boolean = true;
  @Input() showIndicators: boolean = true;
  @Input() endpoint: string = '';
  actualIndex = 0;
  intervalId: any;

  constructor() { }

  ngOnInit(): void {
    if( this.interval ) {
      this.intervalId = setInterval(() => {
        this.plusSlides(1);
      }, this.interval);
    }
  }

  plusSlides(n: number) {
    this.setSlide(this.actualIndex += n);
  }

  setSlide(n: number) {
    this.actualIndex = (n + this.images.length) % this.images.length;
    if( this.interval ) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(() => {
        this.plusSlides(1);
      }, this.interval);
    }
  }
}
