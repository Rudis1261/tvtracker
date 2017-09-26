import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiperPlaceholderComponent } from './swiper-placeholder.component';

describe('SwiperPlaceholderComponent', () => {
  let component: SwiperPlaceholderComponent;
  let fixture: ComponentFixture<SwiperPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwiperPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiperPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
