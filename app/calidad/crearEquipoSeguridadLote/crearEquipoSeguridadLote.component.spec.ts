import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEquipoSeguridadLoteComponent } from './crearEquipoSeguridadLote.component';

describe('CrearEquipoSeguridadLoteComponent', () => {
  let component: CrearEquipoSeguridadLoteComponent;
  let fixture: ComponentFixture<CrearEquipoSeguridadLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEquipoSeguridadLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEquipoSeguridadLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
