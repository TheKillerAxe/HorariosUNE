import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirhorarioComponent } from './imprimirhorario.component';

describe('ImprimirhorarioComponent', () => {
  let component: ImprimirhorarioComponent;
  let fixture: ComponentFixture<ImprimirhorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImprimirhorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirhorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
