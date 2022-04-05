import { TestBed } from '@angular/core/testing';

import { MsqlServiceService } from './msql-service.service';

describe('MsqlServiceService', () => {
  let service: MsqlServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsqlServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
