import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriasComponent } from './asignar-materias.component';

describe('AsignarMateriasComponent', () => {
  let component: AsignarMateriasComponent;
  let fixture: ComponentFixture<AsignarMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarMateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
