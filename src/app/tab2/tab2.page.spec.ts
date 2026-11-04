import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from '../users.models';

import { Tab2PageModule } from './tab2.module';
import { Tab2Page } from './tab2.page';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let updateUser: ReturnType<typeof vi.fn>;
  const users: User[] = [];

  beforeEach(async () => {
    users.length = 0;
    updateUser = vi.fn(async (_userId: string, _user: { name: string; email: string; phone: string }) => undefined);
    await TestBed.configureTestingModule({
      imports: [Tab2PageModule, RouterModule.forRoot([])],
      providers: [{
        provide: UsersService,
        useValue: {
          updateUser,
          watchUsers: (onUsers: (users: User[]) => void) => { onUsers(users); return () => undefined; },
        },
      }]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filters users by name, email, and phone', () => {
    component.users = [
      { id: '1', name: 'Ana Cruz', email: 'ana@example.com', phone: '0912', createdAt: '2026-10-20' },
      { id: '2', name: 'Ben Santos', email: 'ben@example.com', phone: '0999', createdAt: '2026-10-21' },
    ];
    component.searchTerm = '0999';

    expect(component.filteredUsers.map(user => user.name)).toEqual(['Ben Santos']);
  });

  it('opens the selected user for editing and saves changes to that user', async () => {
    const user: User = {
      id: 'user-123',
      name: 'Ana Cruz',
      email: 'ana@example.com',
      phone: '0912',
      createdAt: '2026-10-20',
    };

    component.editUser(user);
    expect(component.isFormOpen).toBe(true);
    expect(component.editingUserId).toBe('user-123');
    expect(component.form).toEqual({ name: 'Ana Cruz', email: 'ana@example.com', phone: '0912' });

    component.form.name = 'Ana Santos';
    await component.saveUser();

    expect(updateUser).toHaveBeenCalledWith('user-123', {
      name: 'Ana Santos',
      email: 'ana@example.com',
      phone: '0912',
    });
    expect(component.isFormOpen).toBe(false);
    expect(component.successMessage).toContain('Na-update');
  });
});
