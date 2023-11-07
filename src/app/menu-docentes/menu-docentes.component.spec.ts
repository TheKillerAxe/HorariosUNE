import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDocentesComponent } from './menu-docentes.component';

describe('MenuDocentesComponent', () => {
  let component: MenuDocentesComponent;
  let fixture: ComponentFixture<MenuDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
