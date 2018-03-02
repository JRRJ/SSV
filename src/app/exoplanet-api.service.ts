import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SystemOverviewModel } from './api-models/systemOverviewModel';
import { PlanetModel } from './api-models/planetModel';

const apiBaseUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets';

@Injectable()
export class ExoplanetApiService {

  constructor(private http: HttpClient) { }

  getSystemList(): Observable<SystemOverviewModel[]> {
    console.log('querying api server for system list');
    return this.http.get<SystemOverviewModel[]>(`${apiBaseUrl}&select=distinct pl_hostname,pl_pnum,st_spstr&order=pl_pnum desc&format=json`)
  }

  getPlanets(hostname: string): Observable<PlanetModel[]> {
    console.log(`querying api server for planets in system ${hostname}`);
    return this.http.get<PlanetModel[]>(`${apiBaseUrl}&select=pl_hostname,pl_letter,pl_orbper,pl_orbsmax,pl_bmassj,pl_radj,pl_dens,st_dist,st_teff,st_mass,st_rad&where=pl_hostname like '${hostname}'&order=pl_orbper&format=json`)    
  }
}
