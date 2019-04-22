import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMalfuncSubgroupComponent } from './create-malfunc-subgroup.component';

describe('CreateMalfuncSubgroupComponent', () => {
  let component: CreateMalfuncSubgroupComponent;
  let fixture: ComponentFixture<CreateMalfuncSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMalfuncSubgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMalfuncSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
