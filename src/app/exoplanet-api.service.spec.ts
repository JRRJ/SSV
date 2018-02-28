import { TestBed, inject } from '@angular/core/testing';

import { ExoplanetApiService } from './exoplanet-api.service';

describe('ExoplanetApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExoplanetApiService]
    });
  });

  it('should be created', inject([ExoplanetApiService], (service: ExoplanetApiService) => {
    expect(service).toBeTruthy();
  }));
});
