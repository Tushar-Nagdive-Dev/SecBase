import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecbaseHome } from './secbase-home';

describe('SecbaseHome', () => {
  let component: SecbaseHome;
  let fixture: ComponentFixture<SecbaseHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecbaseHome],
    }).compileComponents();

    fixture = TestBed.createComponent(SecbaseHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
