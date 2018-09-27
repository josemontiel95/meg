import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosGridComponentP } from './proyectos-grid.component';

describe('ProyectosGridComponentP', () => {
  let component: ProyectosGridComponentP;
  let fixture: ComponentFixture<ProyectosGridComponentP>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosGridComponentP ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGridComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
