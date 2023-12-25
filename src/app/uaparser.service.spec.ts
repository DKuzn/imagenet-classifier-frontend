import { TestBed } from '@angular/core/testing';

import { UaparserService } from './uaparser.service';

describe('UaparserService', () => {
  let service: UaparserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UaparserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
