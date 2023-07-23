import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodRegistrationComponent } from './hod-registration.component';

describe('HodRegistrationComponent', () => {
  let component: HodRegistrationComponent;
  let fixture: ComponentFixture<HodRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HodRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HodRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
