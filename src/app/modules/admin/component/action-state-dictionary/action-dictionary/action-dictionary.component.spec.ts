import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionDictionaryComponent } from './action-dictionary.component';

describe('ActionDictionaryComponent', () => {
  let component: ActionDictionaryComponent;
  let fixture: ComponentFixture<ActionDictionaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionDictionaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionDictionaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
