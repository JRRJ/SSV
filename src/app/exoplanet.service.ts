import { Injectable } from '@angular/core';

const apiBaseUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets';

@Injectable()
export class ExoplanetService {

  constructor() { }

  getSystemNames(): string[] {
    return ['Sol', 'Alpha Centauri'];
  }

}
