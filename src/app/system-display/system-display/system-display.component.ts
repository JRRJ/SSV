import { Component, OnInit, Input } from '@angular/core';
import { SystemDetails } from '../../shared/systemDetails';
import { DisplayPlanet } from '../display-models/displayPlanet';

const sizeMultiple = 5;

@Component({
  selector: 'ssv-system-display',
  templateUrl: './system-display.component.html',
  styleUrls: ['./system-display.component.scss']
})
export class SystemDisplayComponent implements OnInit {
  @Input() system: SystemDetails;
  planets: DisplayPlanet[];

  constructor() { }

  ngOnInit() {
    this.createDisplayPlanets();
  }

  private createDisplayPlanets(): void {
    let x = sizeMultiple;
    this.planets = this.system.planets.map( planet => {
      const pixelRadius = planet.radius * sizeMultiple;
      const position = x + sizeMultiple + pixelRadius;
      const displayPlanet: DisplayPlanet = {
        radiusPixels: pixelRadius,
        xPosition: position,
        colorRGB: planet.temperature ? this.colorTemp(planet.temperature) : '#BBB'
      };
      x = position + pixelRadius;
      // console.log(pix)
      return displayPlanet;
    });
  }

  private colorTemp(temperature: number): string {
    const red = Math.floor(Math.min(255, Math.max(temperature - 300, 0)));
    const blue = Math.floor(Math.max(255 - temperature, 0));
    const green = Math.floor(Math.max(0, 255 - 2 * Math.abs(300 - temperature)));
    return `rgb(${red},${green},${blue})`;
  }
}
