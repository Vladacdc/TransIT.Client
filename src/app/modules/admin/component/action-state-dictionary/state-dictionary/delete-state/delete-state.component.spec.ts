import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteStateComponent } from './delete-state.component';

describe('DeleteStateComponent', () => {
  let component: DeleteStateComponent;
  let fixture: ComponentFixture<DeleteStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
