import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { ExoplanetApiService } from './exoplanet-api.service';
import { SystemOverviewModel } from './api-models/systemOverviewModel';
import { SystemOverview } from './shared/systemOverview';
import { SystemDetails } from './shared/systemDetails';
import { PlanetModel } from './api-models/planetModel';
import { Star } from './shared/star';
import { Planet } from './shared/planet';

@Injectable()
export class ExoplanetService {
  private systems: ReplaySubject<SystemOverview[]>;

  constructor(private exoplanetApiService: ExoplanetApiService) {
  }

  getSystemList(): Observable<SystemOverview[]> {
    if (this.systems === undefined) {
      this.systems = new ReplaySubject(1);
      this.exoplanetApiService.getSystemList()
        .map(systems => systems.map(this.mapSystemOverview))
        .subscribe(systems => this.systems.next(systems));
    }
    console.log(this.systems);
    return this.systems;
  }

  getSystemDetails(starName: string): Observable<SystemDetails> {
    return this.exoplanetApiService.getPlanets(starName)
      .map(planets => this.mapSystemDetails(planets));
  }

  private mapSystemOverview(systemFromApi: SystemOverviewModel): SystemOverview {
    const systemOverview = new SystemOverview();
    systemOverview.name = systemFromApi.pl_hostname;
    systemOverview.planetCount = systemFromApi.pl_pnum;
    systemOverview.spectralType = systemFromApi.st_spstr;
    return systemOverview;
  }

  private mapSystemDetails(planetModels: PlanetModel[]): SystemDetails {
    const star: Star = {
      name: planetModels[0].pl_hostname,
      mass: planetModels[0].st_mass,
      radius: planetModels[0].st_rad,
      temperature: planetModels[0].st_teff,
      luminosity: 0
    };
    star.luminosity = this.calculateLuminosity(star);
    const planets: Planet[] = [];
    planetModels.forEach(planetModel => {
      const planet: Planet = {
        name: planetModel.pl_hostname + ' ' + planetModel.pl_letter,
        period: planetModel.pl_orbper,
        semiMajorAxis: planetModel.pl_orbsmax,
        mass: planetModel.pl_bmassj * 318,
        radius: planetModel.pl_radj ? planetModel.pl_radj * 10.97 : this.planetMassToRadius(planetModel.pl_bmassj * 318),
        temperature: this.calculatePlanetTemperature(star.luminosity, planetModel.pl_orbsmax)
      };
      planets.push(planet);
    });
    const system: SystemDetails = {
      'star': star,
      'planets': planets
    };
    return system;
  }

  private calculateLuminosity(star: Star): number|null {
    if (!star.radius || ! star.temperature) { return null; }
    return (star.radius ** 2) * ((star.temperature / 5772) ** 4);
  }

  private calculatePlanetTemperature(starLuminosity: number, distance: number): number|null {
    if (!starLuminosity || !distance) { return null; }
    return 277 * (starLuminosity ** 0.25) * ((1 / distance) ** 0.5);
  }

  // see Chen & Kipping 2016 arXiv:1603.08614v2
  private planetMassToRadius(mass: number): number {
    if (mass < 2) { return mass ** 0.279; }
    if (mass < 130) { return mass ** 0.59; }
    return 21.89 * (mass ** -0.044);
  }
}
