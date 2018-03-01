import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { ExoplanetApiService } from './exoplanet-api.service';
import { SystemOverview } from './shared/system';

@Injectable()
export class ExoplanetService {
  private systems: ReplaySubject<SystemOverview[]>;

  constructor(private exoplanetApiService: ExoplanetApiService) {
  }

  getSystemList(): Observable<SystemOverview[]> {
    if (this.systems === undefined) {
      this.systems = new ReplaySubject(1)
      this.exoplanetApiService.getSystemList()
        .map(systems => systems.map(systemFromApi => {
          const system = new SystemOverview();
          system.name = systemFromApi.pl_hostname;
          system.planetCount = systemFromApi.pl_pnum;
          system.spectralType = systemFromApi.st_spstr;
          return system;
        }))
        .subscribe(systems => this.systems.next(systems));
    }
    console.log(this.systems);
    return this.systems;
  }
}
