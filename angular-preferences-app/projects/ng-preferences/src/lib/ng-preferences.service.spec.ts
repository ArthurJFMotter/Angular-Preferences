import { TestBed } from '@angular/core/testing';

import { NgPreferencesService } from './ng-preferences.service';

describe('NgPreferencesService', () => {
  let service: NgPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
