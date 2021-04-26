import { TestBed } from '@angular/core/testing';

import { MailchimpService } from './mailchimp.service';

describe('MailchimpService', () => {
  let service: MailchimpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailchimpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
