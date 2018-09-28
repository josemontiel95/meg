import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonUsuarioDetailComponent } from './herramienta-detail.component';

describe('SalonUsuarioDetailComponent', () => {
  let component: SalonUsuarioDetailComponent;
  let fixture: ComponentFixture<SalonUsuarioDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonUsuarioDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonUsuarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
