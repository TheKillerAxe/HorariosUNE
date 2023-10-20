import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadDocenteComponent } from './disponibilidad-docente.component';

describe('DisponibilidadDocenteComponent', () => {
  let component: DisponibilidadDocenteComponent;
  let fixture: ComponentFixture<DisponibilidadDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilidadDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
