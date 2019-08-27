import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMalfuncSubgroupComponent } from './edit-malfunc-subgroup.component';

describe('EditMalfuncSubgroupComponent', () => {
  let component: EditMalfuncSubgroupComponent;
  let fixture: ComponentFixture<EditMalfuncSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMalfuncSubgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMalfuncSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
