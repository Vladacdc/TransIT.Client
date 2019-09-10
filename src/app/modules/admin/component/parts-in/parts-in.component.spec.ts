import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsInComponent } from './parts-in.component';

describe('PartsInComponent', () => {
  let component: PartsInComponent;
  let fixture: ComponentFixture<PartsInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
