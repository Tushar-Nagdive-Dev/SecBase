import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CredentialDetails } from './credential-details';

describe('CredentialDetails', () => {
  let component: CredentialDetails;
  let fixture: ComponentFixture<CredentialDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CredentialDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(CredentialDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
