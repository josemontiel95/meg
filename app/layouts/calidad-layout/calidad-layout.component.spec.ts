import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadLayoutComponent } from './calidad-layout.component';

describe('CalidadLayoutComponent', () => {
  let component: CalidadLayoutComponent;
  let fixture: ComponentFixture<CalidadLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalidadLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
