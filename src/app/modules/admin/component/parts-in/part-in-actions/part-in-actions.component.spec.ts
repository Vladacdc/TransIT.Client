import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInActionsComponent } from './part-in-actions.component';

describe('PartInActionsComponent', () => {
  let component: PartInActionsComponent;
  let fixture: ComponentFixture<PartInActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartInActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartInActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
