import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMalfunctionsComponent } from './filter-malfunctions.component';

describe('FilterMalfunctionsComponent', () => {
  let component: FilterMalfunctionsComponent;
  let fixture: ComponentFixture<FilterMalfunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterMalfunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterMalfunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
