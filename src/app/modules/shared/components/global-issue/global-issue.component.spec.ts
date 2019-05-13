import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalIssueComponent } from './global-issue.component';

describe('GlobalIssueComponent', () => {
  let component: GlobalIssueComponent;
  let fixture: ComponentFixture<GlobalIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
