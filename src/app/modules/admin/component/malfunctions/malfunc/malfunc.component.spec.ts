import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MalfuncComponent } from './malfunc.component';

describe('MalfuncComponent', () => {
  let component: MalfuncComponent;
  let fixture: ComponentFixture<MalfuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MalfuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MalfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
