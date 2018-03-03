import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PlanetModel } from './../api-models/planetModel';
import { ExoplanetService } from './../exoplanet.service';
import { SystemDetails } from '../shared/systemDetails';

@Component({
  selector: 'ssv-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @Input() name: string;
  private system: SystemDetails = {star: null, planets: []};

  constructor(
    private exoplanetService: ExoplanetService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getName();
    this.exoplanetService.getSystemDetails(this.name)
      .subscribe(system => this.system = system);
  }

  private getName(): void {
    this.name = this.route.snapshot.paramMap.get('name');
  }

}
