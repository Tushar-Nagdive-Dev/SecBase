import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCreation } from './profile-creation';

describe('ProfileCreation', () => {
  let component: ProfileCreation;
  let fixture: ComponentFixture<ProfileCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
