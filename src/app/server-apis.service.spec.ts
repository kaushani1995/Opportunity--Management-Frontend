import { TestBed } from '@angular/core/testing';

import { ServerApisService } from './server-apis.service';

describe('ServerApisService', () => {
  let service: ServerApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
