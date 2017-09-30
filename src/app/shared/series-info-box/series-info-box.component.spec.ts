import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesInfoBoxComponent } from './series-info-box.component';

describe('SeriesInfoBoxComponent', () => {
  let component: SeriesInfoBoxComponent;
  let fixture: ComponentFixture<SeriesInfoBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesInfoBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesInfoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
