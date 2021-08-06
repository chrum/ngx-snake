import { TestBed } from '@angular/core/testing';

import { NgxSnakeService } from './ngx-snake.service';

describe('NgxSnakeService', () => {
  let service: NgxSnakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSnakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
