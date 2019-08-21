import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMalfuncGroupComponent } from './delete-malfunc-group.component';

describe('DeleteMalfuncGroupComponent', () => {
  let component: DeleteMalfuncGroupComponent;
  let fixture: ComponentFixture<DeleteMalfuncGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMalfuncGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMalfuncGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
