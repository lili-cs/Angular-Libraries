import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsivePieChartComponent } from './responsive-pie-chart.component';

describe('ResponsivePieChartComponent', () => {
  let component: ResponsivePieChartComponent;
  let fixture: ComponentFixture<ResponsivePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsivePieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsivePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
