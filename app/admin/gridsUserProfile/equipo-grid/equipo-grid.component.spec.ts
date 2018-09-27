import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoGridComponentP } from './equipo-grid.component';

describe('EquipoGridComponentP', () => {
  let component: EquipoGridComponentP;
  let fixture: ComponentFixture<EquipoGridComponentP>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoGridComponentP ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoGridComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
