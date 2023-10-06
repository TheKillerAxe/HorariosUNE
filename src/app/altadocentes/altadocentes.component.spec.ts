import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltadocentesComponent } from './altadocentes.component';

describe('AltadocentesComponent', () => {
  let component: AltadocentesComponent;
  let fixture: ComponentFixture<AltadocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltadocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltadocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
