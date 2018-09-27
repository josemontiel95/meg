import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhInternoLayoutComponent } from './rhInterno-layout.component';

describe('RhInternoLayoutComponent', () => {
  let component: RhInternoLayoutComponent;
  let fixture: ComponentFixture<RhInternoLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhInternoLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhInternoLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
