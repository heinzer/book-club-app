import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePreviewComponent } from './style-preview.component';

describe('StylePreviewComponent', () => {
  let component: StylePreviewComponent;
  let fixture: ComponentFixture<StylePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
