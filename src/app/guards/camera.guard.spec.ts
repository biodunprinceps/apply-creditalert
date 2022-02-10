import { TestBed } from '@angular/core/testing';

import { CameraGuard } from './camera.guard';

describe('CameraGuard', () => {
  let guard: CameraGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CameraGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
