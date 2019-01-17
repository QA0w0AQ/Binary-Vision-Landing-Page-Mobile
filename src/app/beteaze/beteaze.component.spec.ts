import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeteazeComponent } from './beteaze.component';

describe('BeteazeComponent', () => {
  let component: BeteazeComponent;
  let fixture: ComponentFixture<BeteazeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeteazeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeteazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
