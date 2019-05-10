import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogAnalystComponent } from './issue-log-analyst.component';

describe('IssueLogAnalystComponent', () => {
  let component: IssueLogAnalystComponent;
  let fixture: ComponentFixture<IssueLogAnalystComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogAnalystComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
