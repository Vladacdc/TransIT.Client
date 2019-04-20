import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubgroupMalfuncComponent } from './create-subgroup-malfunc.component';

describe('CreateSubgroupMalfuncComponent', () => {
  let component: CreateSubgroupMalfuncComponent;
  let fixture: ComponentFixture<CreateSubgroupMalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubgroupMalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubgroupMalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
