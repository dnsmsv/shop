import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../models/product.model';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, AfterViewInit {
  @ViewChild('picture') private picture: ElementRef;

  private leftPosition: number;
  private width: number;

  constructor(private firebaseService: FirebaseService) {}

  selectedUrl: string;
  urls: string[];
  mouseOnPicture: boolean = false;

  @Input() product: Product;

  async ngOnInit() {
    if (this.product) {
      this.urls = await this.firebaseService.getProductPictureUrls(
        this.product
      );

      if (this.urls?.length) this.selectedUrl = this.urls[0];
    }
  }

  ngAfterViewInit(): void {
    const rect = this.picture.nativeElement.getBoundingClientRect();
    this.leftPosition = rect.x;
    this.width = rect.width;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.mouseOnPicture && this.urls) {
      const areaWidth = this.width / this.urls.length;

      for (let i = 0; i < this.urls.length; i++) {
        if (
          event.clientX > this.leftPosition + areaWidth * i &&
          event.clientX <= this.leftPosition + areaWidth * (i + 1)
        ) {
          this.selectedUrl = this.urls[i];
        }
      }
    }
  }

  mouseoverHandler() {
    this.mouseOnPicture = true;
  }

  mouseoutHandler() {
    this.mouseOnPicture = false;
  }

  addToCart(): void {}
}
