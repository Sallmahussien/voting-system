import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendFormComponent } from './extend-form.component';

describe('ExtendFormComponent', () => {
  let component: ExtendFormComponent;
  let fixture: ComponentFixture<ExtendFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtendFormComponent]
    });
    fixture = TestBed.createComponent(ExtendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
