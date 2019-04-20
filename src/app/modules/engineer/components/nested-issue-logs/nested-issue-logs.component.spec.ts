import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedIssueLogsComponent } from './nested-issue-logs.component';

describe('NestedIssueLogsComponent', () => {
  let component: NestedIssueLogsComponent;
  let fixture: ComponentFixture<NestedIssueLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedIssueLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedIssueLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
