import { TestBed } from '@angular/core/testing';

import { ContactListResolver } from './contact-list.service';

describe('ContactListResolver', () => {
  let service: ContactListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactListResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
