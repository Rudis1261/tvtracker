import { TestBed, inject } from '@angular/core/testing';

import { LoadscriptService } from './loadscript.service';

describe('LoadscriptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadscriptService]
    });
  });

  it('should ...', inject([LoadscriptService], (service: LoadscriptService) => {
    expect(service).toBeTruthy();
  }));
});
