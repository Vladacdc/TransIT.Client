import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCountryComponent } from './delete-country.component';

describe('DeleteCountryComponent', () => {
  let component: DeleteCountryComponent;
  let fixture: ComponentFixture<DeleteCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
