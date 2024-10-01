import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOnSmallComponent } from './header-on-small.component';

describe('HeaderOnSmallComponent', () => {
  let component: HeaderOnSmallComponent;
  let fixture: ComponentFixture<HeaderOnSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderOnSmallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderOnSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
