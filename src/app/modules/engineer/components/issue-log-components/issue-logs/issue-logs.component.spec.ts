import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogsComponent } from './issue-logs.component';

describe('IssueLogsComponent', () => {
  let component: IssueLogsComponent;
  let fixture: ComponentFixture<IssueLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueLogsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
