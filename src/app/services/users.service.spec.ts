import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UsersService, User } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve users from the API via GET', () => {
    const dummyUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Main St',
          suite: 'Apt. 1',
          city: 'New York',
          zipcode: '10001',
          geo: {
            lat: '40.7128',
            lng: '74.0060'
          }
        },
        phone: '123-456-7890',
        website: 'johndoe.com',
        company: {
          name: 'Doe Enterprises',
          catchPhrase: 'Innovation at its best',
          bs: 'business solutions'
        }
      },
      {
        id: 2,
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane.smith@example.com',
        address: {
          street: '456 Another St',
          suite: 'Suite 2',
          city: 'Los Angeles',
          zipcode: '90001',
          geo: {
            lat: '34.0522',
            lng: '118.2437'
          }
        },
        phone: '987-654-3210',
        website: 'janesmith.com',
        company: {
          name: 'Smith Inc.',
          catchPhrase: 'Quality over quantity',
          bs: 'tech services'
        }
      }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUsers);
  });
});
