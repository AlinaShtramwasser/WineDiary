/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WineryListComponent } from './winery-list.component';

describe('WineryListComponent', () => {
  let component: WineryListComponent;
  let fixture: ComponentFixture<WineryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WineryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WineryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
