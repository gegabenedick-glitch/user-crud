import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { User } from '../users.models';
import { getUsersLoadErrorMessage, UsersService } from '../users.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.books.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit, OnDestroy {
  private readonly usersService = inject(UsersService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private stopWatching?: Unsubscribe;
  users: User[] = [];
  loading = true;
  errorMessage = '';

  get usersWithPhone(): number {
    return this.users.filter(user => Boolean(user.phone.trim())).length;
  }

  get usersWithoutPhone(): number {
    return this.users.length - this.usersWithPhone;
  }

  get phonePercentage(): number {
    return this.users.length ? Math.round((this.usersWithPhone / this.users.length) * 100) : 0;
  }

  get latestUsers(): User[] {
    return [...this.users]
      .sort((first, second) => second.createdAt.localeCompare(first.createdAt))
      .slice(0, 5);
  }

  ngOnInit(): void {
    this.refreshUsers();
  }

  ngOnDestroy(): void {
    this.stopWatching?.();
  }

  refreshUsers(): void {
    this.stopWatching?.();
    this.loading = true;
    this.errorMessage = '';
    this.stopWatching = this.usersService.watchUsers(users => {
      this.users = users;
      this.loading = false;
      this.errorMessage = '';
      this.changeDetector.markForCheck();
    }, error => {
      console.error('Unable to load users overview:', error);
      this.errorMessage = getUsersLoadErrorMessage(error);
      this.loading = false;
      this.changeDetector.markForCheck();
    });
  }
}
