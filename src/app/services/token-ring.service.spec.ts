import { TestBed, inject } from '@angular/core/testing';

import { TokenRingService } from './token-ring.service';

describe('TokenRingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenRingService]
    });
  });

  it('should ...', inject([TokenRingService], (service: TokenRingService) => {
    expect(service).toBeTruthy();
  }));
});
