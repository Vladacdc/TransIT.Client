import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDocumentComponent } from './global-document.component';

describe('GlobalDocumentComponent', () => {
  let component: GlobalDocumentComponent;
  let fixture: ComponentFixture<GlobalDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
