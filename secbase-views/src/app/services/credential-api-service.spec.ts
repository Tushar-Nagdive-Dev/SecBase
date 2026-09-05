import { TestBed } from '@angular/core/testing';
import { CredentialApiService } from './credential-api-service';

describe('CredentialApiService', () => {
  let service: CredentialApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
