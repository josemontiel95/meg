import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuestoDetailComponent } from './puesto-detail.component';

describe('PuestoDetailComponent', () => {
  let component: PuestoDetailComponent;
  let fixture: ComponentFixture<PuestoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuestoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuestoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
