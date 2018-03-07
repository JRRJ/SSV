import { Component, OnInit } from '@angular/core';
import { ExoplanetService } from './../exoplanet.service';

import 'rxjs/add/operator/first';

import { SystemOverview } from './../shared/systemOverview';

@Component({
  selector: 'ssv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  systems: SystemOverview[];

  constructor(private exoplanetService: ExoplanetService) { }

  ngOnInit() {
    this.exoplanetService.getSystemList().first()
      .subscribe(systems => this.systems = systems);
  }

}
