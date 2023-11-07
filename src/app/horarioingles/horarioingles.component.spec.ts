import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioinglesComponent } from './horarioingles.component';

describe('HorarioinglesComponent', () => {
  let component: HorarioinglesComponent;
  let fixture: ComponentFixture<HorarioinglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioinglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioinglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
