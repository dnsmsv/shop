import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDiscountsSliderComponent } from './main-discounts-slider.component';

describe('MainDiscountsSliderComponent', () => {
  let component: MainDiscountsSliderComponent;
  let fixture: ComponentFixture<MainDiscountsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDiscountsSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDiscountsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
