import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoGridComponent } from './equipo-grid.component';

describe('EquipoGridComponent', () => {
  let component: EquipoGridComponent;
  let fixture: ComponentFixture<EquipoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
