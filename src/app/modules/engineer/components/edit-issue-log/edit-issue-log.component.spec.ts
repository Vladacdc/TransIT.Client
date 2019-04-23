import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIssueLogComponent } from './edit-issue-log.component';

describe('EditIssueLogComponent', () => {
  let component: EditIssueLogComponent;
  let fixture: ComponentFixture<EditIssueLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIssueLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIssueLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
