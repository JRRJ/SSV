import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { map, tap } from 'rxjs/operators';

const apiBaseUrl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets';

class SystemSummary {
  pl_hostname: string;
}

@Injectable()
export class ExoplanetService {

  constructor(private http: HttpClient) { }

  getSystemNames(): Observable<string[]> {
    return this.http.get<SystemSummary[]>(`${apiBaseUrl}&select=distinct%20pl_hostname&order=pl_hostname&format=json`)
      .pipe(
        tap(x => console.log(x)),
        map(x => x.map(y => y.pl_hostname)),
      );
  }

}
