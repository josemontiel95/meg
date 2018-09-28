import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoSeguridadComponent } from './equipoSeguridad.component';

describe('EquipoSeguridadComponent', () => {
  let component: EquipoSeguridadComponent;
  let fixture: ComponentFixture<EquipoSeguridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoSeguridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
