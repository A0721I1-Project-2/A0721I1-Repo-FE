import { TestBed } from '@angular/core/testing';

import { AuctionProductService } from './auction-product.service';

describe('AuctionProductService', () => {
  let service: AuctionProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
