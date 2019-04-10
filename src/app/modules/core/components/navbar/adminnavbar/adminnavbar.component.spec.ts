import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnavbarComponent } from './adminnavbar.component';

describe('AdminnavbarComponent', () => {
  let component: AdminnavbarComponent;
  let fixture: ComponentFixture<AdminnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
