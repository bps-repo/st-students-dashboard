import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsByLevelComponent } from './lessons-by-level.component';

describe('LessonsByLevelComponent', () => {
  let component: LessonsByLevelComponent;
  let fixture: ComponentFixture<LessonsByLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsByLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsByLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
