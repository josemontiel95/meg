import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertaComprobanteQRComponent } from './insertar-comprobanteQR.component';

describe('InsertaComprobanteQRComponent', () => {
  let component: InsertaComprobanteQRComponent;
  let fixture: ComponentFixture<InsertaComprobanteQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertaComprobanteQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertaComprobanteQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
