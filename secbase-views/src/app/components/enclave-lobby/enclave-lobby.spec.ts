import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnclaveLobby } from './enclave-lobby';

describe('EnclaveLobby', () => {
  let component: EnclaveLobby;
  let fixture: ComponentFixture<EnclaveLobby>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnclaveLobby],
    }).compileComponents();

    fixture = TestBed.createComponent(EnclaveLobby);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
