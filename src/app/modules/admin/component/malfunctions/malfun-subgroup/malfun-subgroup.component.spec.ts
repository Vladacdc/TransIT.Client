import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfunSubgroupComponent } from './malfun-subgroup.component';

describe('MalfunSubgroupComponent', () => {
  let component: MalfunSubgroupComponent;
  let fixture: ComponentFixture<MalfunSubgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfunSubgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfunSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
