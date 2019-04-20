import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroupMalfuncComponent } from './create-group-malfunc.component';

describe('CreateGroupMalfuncComponent', () => {
  let component: CreateGroupMalfuncComponent;
  let fixture: ComponentFixture<CreateGroupMalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroupMalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupMalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
