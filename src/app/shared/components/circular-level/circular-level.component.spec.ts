import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularLevelComponent } from './circular-level.component';

describe('CircularLevelComponent', () => {
  let component: CircularLevelComponent;
  let fixture: ComponentFixture<CircularLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircularLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircularLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
