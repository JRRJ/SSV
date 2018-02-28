import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/first';

import { ExoplanetApiService } from './exoplanet-api.service'

@Injectable()
export class ExoplanetService {
  private systems: ReplaySubject<string[]>;

  constructor(private exoplanetApiService: ExoplanetApiService) {
  }

  getSystemNames(): Observable<string[]> {
    if (this.systems === undefined) {
      this.systems = new ReplaySubject(1)
      this.exoplanetApiService.getSystemNames()
        .subscribe(systems => this.systems.next(systems));
    }
    console.log(this.systems);
    return this.systems;
  }
}
