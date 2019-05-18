import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogStateComponent } from './issue-log-state.component';

describe('IssueLogStateComponent', () => {
  let component: IssueLogStateComponent;
  let fixture: ComponentFixture<IssueLogStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
