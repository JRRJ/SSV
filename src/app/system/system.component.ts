import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlanetModel } from './../api-models/planetModel';
import { ExoplanetApiService } from './../exoplanet-api.service';

@Component({
  selector: 'ssv-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @Input() name: string;
  private planets: PlanetModel[];

  constructor(
    private exoplanetApiService: ExoplanetApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getName();
    this.exoplanetApiService.getPlanets(this.name)
      .subscribe(planets => this.planets = planets);
  }

  private getName(): void {
    this.name = this.route.snapshot.paramMap.get('name');
  }

}
