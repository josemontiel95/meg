import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoSeguridadDetailComponent } from './equipoSeguridadDetail.component';

describe('EquipoSeguridadDetailComponent', () => {
  let component: EquipoSeguridadDetailComponent;
  let fixture: ComponentFixture<EquipoSeguridadDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipoSeguridadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoSeguridadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
