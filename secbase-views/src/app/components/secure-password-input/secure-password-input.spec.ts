import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurePasswordInput } from './secure-password-input';

describe('SecurePasswordInput', () => {
  let component: SecurePasswordInput;
  let fixture: ComponentFixture<SecurePasswordInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurePasswordInput],
    }).compileComponents();

    fixture = TestBed.createComponent(SecurePasswordInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
