import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormPage } from './book-form.page';

describe('CreateBookPage', () => {
  let component: BookFormPage;
  let fixture: ComponentFixture<BookFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
