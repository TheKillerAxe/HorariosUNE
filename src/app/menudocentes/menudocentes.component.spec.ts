import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudocentesComponent } from './menudocentes.component';

describe('MenudocentesComponent', () => {
  let component: MenudocentesComponent;
  let fixture: ComponentFixture<MenudocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenudocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenudocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
