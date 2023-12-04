import { TestBed } from '@angular/core/testing';

import { AuthGuardTsGuard } from './auth.guard';

describe('AuthGuardTsGuard', () => {
  let guard: AuthGuardTsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuardTsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
