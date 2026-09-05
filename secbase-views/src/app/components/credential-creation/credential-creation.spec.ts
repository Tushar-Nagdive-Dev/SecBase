import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredentialCreation } from './credential-creation';

describe('CredentialCreation', () => {
  let component: CredentialCreation;
  let fixture: ComponentFixture<CredentialCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
