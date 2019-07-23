import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBookPage } from './create-book.page';

describe('CreateBookPage', () => {
  let component: CreateBookPage;
  let fixture: ComponentFixture<CreateBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
