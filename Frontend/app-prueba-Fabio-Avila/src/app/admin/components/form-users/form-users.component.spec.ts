import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsersComponent } from './form-Users.component';

describe('FormUsersComponent', () => {
  let component: FormUsersComponent;
  let fixture: ComponentFixture<FormUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUsersComponent]
    });
    fixture = TestBed.createComponent(FormUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
