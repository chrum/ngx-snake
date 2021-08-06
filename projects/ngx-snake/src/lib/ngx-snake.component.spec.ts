import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSnakeComponent } from './ngx-snake.component';

describe('NgxSnakeComponent', () => {
  let component: NgxSnakeComponent;
  let fixture: ComponentFixture<NgxSnakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSnakeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
