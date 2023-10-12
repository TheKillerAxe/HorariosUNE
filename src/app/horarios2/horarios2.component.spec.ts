import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Horarios2Component } from './horarios2.component';

describe('Horarios2Component', () => {
  let component: Horarios2Component;
  let fixture: ComponentFixture<Horarios2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Horarios2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Horarios2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
