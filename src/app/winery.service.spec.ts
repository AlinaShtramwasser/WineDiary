/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WineryService } from './winery.service';

describe('Service: Winery', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WineryService]
    });
  });

  it('should ...', inject([WineryService], (service: WineryService) => {
    expect(service).toBeTruthy();
  }));
});
