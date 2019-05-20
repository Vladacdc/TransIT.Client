import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionDictionaryComponent } from './transition-dictionary.component';

describe('TransitionDictionaryComponent', () => {
  let component: TransitionDictionaryComponent;
  let fixture: ComponentFixture<TransitionDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
