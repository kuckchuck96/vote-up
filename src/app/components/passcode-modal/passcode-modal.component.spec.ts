import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasscodeModalComponent } from './passcode-modal.component';

describe('PasscodeModalComponent', () => {
  let component: PasscodeModalComponent;
  let fixture: ComponentFixture<PasscodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasscodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasscodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
