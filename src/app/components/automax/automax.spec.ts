import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Automax } from './automax';

describe('Automax', () => {
  let component: Automax;
  let fixture: ComponentFixture<Automax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Automax],
    }).compileComponents();

    fixture = TestBed.createComponent(Automax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
