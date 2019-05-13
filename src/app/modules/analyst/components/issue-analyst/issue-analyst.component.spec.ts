import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueAnalystComponent } from './issue-analyst.component';

describe('IssueAnalystComponent', () => {
  let component: IssueAnalystComponent;
  let fixture: ComponentFixture<IssueAnalystComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueAnalystComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
