import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMalfuncSubgroupComponent } from './delete-malfunc-subgroup.component';

describe('DeleteMalfuncSubgroupComponent', () => {
  let component: DeleteMalfuncSubgroupComponent;
  let fixture: ComponentFixture<DeleteMalfuncSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMalfuncSubgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMalfuncSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
