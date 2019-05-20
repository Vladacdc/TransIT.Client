import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTransitionComponent } from './delete-transition.component';

describe('DeleteTransitionComponent', () => {
  let component: DeleteTransitionComponent;
  let fixture: ComponentFixture<DeleteTransitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTransitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
