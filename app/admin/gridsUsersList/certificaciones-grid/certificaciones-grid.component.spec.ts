import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificacionesGridComponent } from './certificaciones-grid.component';

describe('CertificacionesGridComponent', () => {
  let component: CertificacionesGridComponent;
  let fixture: ComponentFixture<CertificacionesGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificacionesGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificacionesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
