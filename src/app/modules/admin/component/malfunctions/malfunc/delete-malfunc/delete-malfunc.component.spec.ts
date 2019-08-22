import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMalfuncComponent } from './delete-malfunc.component';

describe('DeleteMalfuncComponent', () => {
  let component: DeleteMalfuncComponent;
  let fixture: ComponentFixture<DeleteMalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
