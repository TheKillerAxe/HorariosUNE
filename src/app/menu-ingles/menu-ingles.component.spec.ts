import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInglesComponent } from './menu-ingles.component';

describe('MenuInglesComponent', () => {
  let component: MenuInglesComponent;
  let fixture: ComponentFixture<MenuInglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
