import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarProjectManagerComponent } from './sidebarProjectManager.component';

describe('SidebarProjectManagerComponent', () => {
  let component: SidebarProjectManagerComponent;
  let fixture: ComponentFixture<SidebarProjectManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarProjectManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarProjectManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
