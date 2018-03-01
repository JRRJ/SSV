import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemOverviewModel } from './api-models/systemOverviewModel';

const apiBaseUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets';

@Injectable()
export class ExoplanetApiService {

  constructor(private http: HttpClient) { }

  getSystemList(): Observable<SystemOverviewModel[]> {
    console.log('querying api server');
    return this.http.get<SystemOverviewModel[]>(`${apiBaseUrl}&select=distinct pl_hostname,pl_pnum,st_spstr&order=pl_pnum desc&format=json`)
  }
}
