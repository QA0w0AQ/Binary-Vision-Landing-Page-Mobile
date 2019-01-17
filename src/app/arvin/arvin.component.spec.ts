import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArvinComponent } from './arvin.component';

describe('ArvinComponent', () => {
  let component: ArvinComponent;
  let fixture: ComponentFixture<ArvinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArvinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArvinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
