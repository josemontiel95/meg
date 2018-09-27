import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosGridComponent } from './proyectos-grid.component';

describe('ProyectosGridComponent', () => {
  let component: ProyectosGridComponent;
  let fixture: ComponentFixture<ProyectosGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectosGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
