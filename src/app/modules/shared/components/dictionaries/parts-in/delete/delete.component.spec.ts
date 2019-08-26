import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePartInComponent } from './delete.component';

describe('DeletePartInComponent', () => {
  let component: DeletePartInComponent;
  let fixture: ComponentFixture<DeletePartInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletePartInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePartInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
