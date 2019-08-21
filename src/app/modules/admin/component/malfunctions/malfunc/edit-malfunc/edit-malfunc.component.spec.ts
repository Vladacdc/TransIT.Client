import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMalfuncComponent } from './edit-malfunc.component';

describe('EditMalfuncComponent', () => {
  let component: EditMalfuncComponent;
  let fixture: ComponentFixture<EditMalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
