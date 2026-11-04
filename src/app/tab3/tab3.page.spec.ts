import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { UsersService } from '../users.service';

import { Tab3PageModule } from './tab3.module';
import { Tab3Page } from './tab3.page';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tab3PageModule, RouterModule.forRoot([])],
      providers: [{ provide: UsersService, useValue: { watchUsers: (onUsers: (users: never[]) => void) => { onUsers([]); return () => undefined; } } }]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows user directory counts', () => {
    component.users = [
      { id: '1', name: 'Ana Cruz', email: 'ana@example.com', phone: '0912', createdAt: '2026-10-20' },
      { id: '2', name: 'Ben Santos', email: 'ben@example.com', phone: '', createdAt: '2026-10-21' },
    ];

    expect(component.usersWithPhone).toBe(1);
    expect(component.usersWithoutPhone).toBe(1);
  });
});
