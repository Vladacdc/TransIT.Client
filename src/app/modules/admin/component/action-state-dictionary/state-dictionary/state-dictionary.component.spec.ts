import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDictionaryComponent } from './state-dictionary.component';

describe('StateDictionaryComponent', () => {
  let component: StateDictionaryComponent;
  let fixture: ComponentFixture<StateDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
