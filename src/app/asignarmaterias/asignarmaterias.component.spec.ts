import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarmateriasComponent } from './asignarmaterias.component';

describe('AsignarmateriasComponent', () => {
  let component: AsignarmateriasComponent;
  let fixture: ComponentFixture<AsignarmateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarmateriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarmateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
