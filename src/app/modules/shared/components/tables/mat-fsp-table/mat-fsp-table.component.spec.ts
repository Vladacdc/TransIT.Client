import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFspTableComponent } from './mat-fsp-table.component';

describe('MatFspTableComponent', () => {
  let component: MatFspTableComponent;
  let fixture: ComponentFixture<MatFspTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatFspTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatFspTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
