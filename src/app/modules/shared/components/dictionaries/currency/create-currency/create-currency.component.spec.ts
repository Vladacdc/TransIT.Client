import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCurrencyComponent } from './create-currency.component';

describe('CreateCurrencyComponent', () => {
  let component: CreateCurrencyComponent;
  let fixture: ComponentFixture<CreateCurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
