import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KoffeeRunComponent } from './koffee-run.component';

describe('KoffeeRunComponent', () => {
  let component: KoffeeRunComponent;
  let fixture: ComponentFixture<KoffeeRunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KoffeeRunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KoffeeRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
