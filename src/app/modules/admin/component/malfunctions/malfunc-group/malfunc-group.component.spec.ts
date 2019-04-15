import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfuncGroupComponent } from './malfunc-group.component';

describe('MalfuncGroupComponent', () => {
  let component: MalfuncGroupComponent;
  let fixture: ComponentFixture<MalfuncGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfuncGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfuncGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
