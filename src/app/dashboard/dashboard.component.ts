import { Component, OnInit } from '@angular/core';
import { ExoplanetService } from '../exoplanet.service';

@Component({
  selector: 'ssv-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private systems: string[];

  constructor(private exoplanetService: ExoplanetService) { }

  ngOnInit() {
    this.exoplanetService.getSystemNames().first()
      .subscribe(systems => this.systems = systems);
  }

}
