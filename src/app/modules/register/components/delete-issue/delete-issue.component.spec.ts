import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteIssueComponent } from './delete-issue.component';

describe('DeleteIssueComponent', () => {
  let component: DeleteIssueComponent;
  let fixture: ComponentFixture<DeleteIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
