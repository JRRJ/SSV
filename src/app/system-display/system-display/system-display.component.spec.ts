import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemDisplayComponent } from './system-display.component';

describe('SystemDisplayComponent', () => {
  let component: SystemDisplayComponent;
  let fixture: ComponentFixture<SystemDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
