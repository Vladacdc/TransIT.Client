import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogActionTypeComponent } from './issue-log-action-type.component';

describe('IssueLogActionTypeComponent', () => {
  let component: IssueLogActionTypeComponent;
  let fixture: ComponentFixture<IssueLogActionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogActionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogActionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
