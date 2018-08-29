/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TeethComponent } from './teeth.component';

describe('TeethComponent', () => {
  let component: TeethComponent;
  let fixture: ComponentFixture<TeethComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeethComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
