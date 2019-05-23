import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogDocumentsComponent } from './issue-log-documents.component';

describe('IssueLogDocumentsComponent', () => {
  let component: IssueLogDocumentsComponent;
  let fixture: ComponentFixture<IssueLogDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
