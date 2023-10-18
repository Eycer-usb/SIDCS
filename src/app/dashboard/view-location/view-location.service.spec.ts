import { TestBed } from '@angular/core/testing';

import { ViewLocationService } from './view-location.service';

describe('ViewLocationService', () => {
  let service: ViewLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
