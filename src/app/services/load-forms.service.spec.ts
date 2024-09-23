import { TestBed } from '@angular/core/testing';

import { LoadFormsService } from './load-forms.service';

describe('LoadFormsService', () => {
  let service: LoadFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
