import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRhInternoComponent } from './sidebarRhInterno.component';

describe('SidebarRhInternoComponent', () => {
  let component: SidebarRhInternoComponent;
  let fixture: ComponentFixture<SidebarRhInternoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarRhInternoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarRhInternoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
