import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEquipoSeguridadComponent } from './crearEquipoSeguridad.component';

describe('CrearEquipoSeguridadComponent', () => {
  let component: CrearEquipoSeguridadComponent;
  let fixture: ComponentFixture<CrearEquipoSeguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEquipoSeguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEquipoSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
