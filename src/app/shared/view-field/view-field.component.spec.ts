import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFieldComponent } from './view-field.component';

describe('ViewFieldComponent', () => {
  let component: ViewFieldComponent;
  let fixture: ComponentFixture<ViewFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFieldComponent]
    });
    fixture = TestBed.createComponent(ViewFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
