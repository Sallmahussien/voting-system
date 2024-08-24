import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostponeFormComponent } from './postpone-form.component';

describe('PostponeFormComponent', () => {
  let component: PostponeFormComponent;
  let fixture: ComponentFixture<PostponeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostponeFormComponent]
    });
    fixture = TestBed.createComponent(PostponeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
