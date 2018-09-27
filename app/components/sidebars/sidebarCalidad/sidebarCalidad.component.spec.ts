import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCalidadComponent } from './sidebarCalidad.component';

describe('SidebarCalidadComponent', () => {
  let component: SidebarCalidadComponent;
  let fixture: ComponentFixture<SidebarCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarCalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
