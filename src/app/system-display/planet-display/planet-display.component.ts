import { Component, Input, OnInit } from '@angular/core';
import { DisplayPlanet } from '../display-models/displayPlanet';

@Component({
  selector: '[ssv-planet-display]',
  templateUrl: './planet-display.component.html',
  styleUrls: ['./planet-display.component.scss']
})
export class PlanetDisplayComponent implements OnInit {
  @Input() planet: DisplayPlanet;

  constructor() { }

  ngOnInit() {
  }

}
