import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformReviewComponent } from './platform-review.component';

describe('PlatformReviewComponent', () => {
  let component: PlatformReviewComponent;
  let fixture: ComponentFixture<PlatformReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
