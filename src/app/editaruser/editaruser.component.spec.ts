import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaruserComponent } from './editaruser.component';

describe('EditaruserComponent', () => {
  let component: EditaruserComponent;
  let fixture: ComponentFixture<EditaruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditaruserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
