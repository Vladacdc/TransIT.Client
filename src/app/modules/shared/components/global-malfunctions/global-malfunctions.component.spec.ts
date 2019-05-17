import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMalfunctionsComponent } from './global-malfunctions.component';

describe('GlobalMalfunctionsComponent', () => {
  let component: GlobalMalfunctionsComponent;
  let fixture: ComponentFixture<GlobalMalfunctionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalMalfunctionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMalfunctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
