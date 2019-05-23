import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NestedDocumentComponent } from './nested-document.component';

describe('NestedDocumentComponent', () => {
  let component: NestedDocumentComponent;
  let fixture: ComponentFixture<NestedDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NestedDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NestedDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
