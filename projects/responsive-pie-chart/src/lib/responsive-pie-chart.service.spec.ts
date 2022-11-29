import { TestBed } from '@angular/core/testing';

import { ResponsivePieChartService } from './responsive-pie-chart.service';

describe('ResponsivePieChartService', () => {
  let service: ResponsivePieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsivePieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
