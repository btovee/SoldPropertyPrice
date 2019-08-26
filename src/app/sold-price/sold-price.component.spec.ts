import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPriceComponent } from './sold-price.component';

describe('SoldPriceComponent', () => {
  let component: SoldPriceComponent;
  let fixture: ComponentFixture<SoldPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
