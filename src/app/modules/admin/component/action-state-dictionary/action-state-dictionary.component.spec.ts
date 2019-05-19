import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionStateDictionaryComponent } from './action-state-dictionary.component';

describe('ActionStateDictionaryComponent', () => {
  let component: ActionStateDictionaryComponent;
  let fixture: ComponentFixture<ActionStateDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionStateDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionStateDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
