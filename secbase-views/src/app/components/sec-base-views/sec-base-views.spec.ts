import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecBaseViews } from './sec-base-views';

describe('SecBaseViews', () => {
  let component: SecBaseViews;
  let fixture: ComponentFixture<SecBaseViews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecBaseViews],
    }).compileComponents();

    fixture = TestBed.createComponent(SecBaseViews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
