import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { User, UserInput } from '../users.models';
import { UsersService } from '../users.service';
import { Tab1PageModule } from './tab1.module';
import { Tab1Page } from './tab1.page';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;
  let createdUsers: UserInput[];
  const users: User[] = [];

  beforeEach(async () => {
    createdUsers = [];
    users.length = 0;
    await TestBed.configureTestingModule({
      imports: [Tab1PageModule, RouterModule.forRoot([])],
      providers: [{
        provide: UsersService,
        useValue: {
          addUser: async (user: UserInput) => { createdUsers.push(user); },
          watchUsers: (onUsers: (users: User[]) => void) => { onUsers(users); return () => undefined; },
        },
      }],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('creates a user with trimmed fields', async () => {
    component.form = { name: '  Ana Cruz  ', email: ' ana@example.com ', phone: ' 09123456789 ' };

    await component.saveUser();

    expect(createdUsers).toEqual([{ name: 'Ana Cruz', email: 'ana@example.com', phone: '09123456789' }]);
    expect(component.successMessage).toContain('Naidagdag');
  });

  it('requires a name and email before creating a user', async () => {
    await component.saveUser();

    expect(createdUsers).toHaveLength(0);
  });

});
