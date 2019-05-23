import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMalfuncComponent } from './create-malfunc.component';

describe('CreateMalfuncComponent', () => {
  let component: CreateMalfuncComponent;
  let fixture: ComponentFixture<CreateMalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
