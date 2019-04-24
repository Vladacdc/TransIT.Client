import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueLogSuppliersComponent } from './issue-log-suppliers.component';

describe('IssueLogSuppliersComponent', () => {
  let component: IssueLogSuppliersComponent;
  let fixture: ComponentFixture<IssueLogSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueLogSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueLogSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
