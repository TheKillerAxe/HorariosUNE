import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioInglesComponent } from './horario-ingles.component';

describe('HorarioInglesComponent', () => {
  let component: HorarioInglesComponent;
  let fixture: ComponentFixture<HorarioInglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioInglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioInglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
