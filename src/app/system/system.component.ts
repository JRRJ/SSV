import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ssv-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {
  @Input() name: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getName();
  }

  private getName(): void {
    this.name = this.route.snapshot.paramMap.get('name');
  }

}
