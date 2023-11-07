import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuingComponent } from './menuing.component';

describe('MenuingComponent', () => {
  let component: MenuingComponent;
  let fixture: ComponentFixture<MenuingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
