import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZeroKnowledgeWarning } from './zero-knowledge-warning';

describe('ZeroKnowledgeWarning', () => {
  let component: ZeroKnowledgeWarning;
  let fixture: ComponentFixture<ZeroKnowledgeWarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZeroKnowledgeWarning],
    }).compileComponents();

    fixture = TestBed.createComponent(ZeroKnowledgeWarning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
