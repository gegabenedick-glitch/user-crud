import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Unsubscribe } from 'firebase/firestore';
import { ViewChild } from '@angular/core';
import { User, UserInput } from '../users.models';
import { getUsersLoadErrorMessage, UsersService } from '../users.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.books.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit, OnDestroy {
  @ViewChild(IonContent) private content?: IonContent;
  private readonly usersService = inject(UsersService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private stopWatchingUsers?: Unsubscribe;
  users: User[] = [];
  searchTerm = '';
  isFormOpen = false;
  isSaving = false;
  editingUserId: string | null = null;
  form: UserInput = this.emptyForm();
  successMessage = '';
  errorMessage = '';

  get filteredUsers(): User[] {
    const query = this.searchTerm.trim().toLowerCase();
    return this.users.filter(user => !query || `${user.name} ${user.email} ${user.phone}`.toLowerCase().includes(query));
  }

  ngOnInit(): void {
    this.stopWatchingUsers = this.usersService.watchUsers(users => {
      this.users = users.sort((first, second) => second.createdAt.localeCompare(first.createdAt));
      this.errorMessage = '';
      this.changeDetector.markForCheck();
    }, error => {
      console.error('Unable to load users:', error);
      this.errorMessage = getUsersLoadErrorMessage(error);
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.stopWatchingUsers?.();
  }

  editUser(user: User): void {
    this.editingUserId = user.id;
    this.form = { name: user.name, email: user.email, phone: user.phone };
    this.errorMessage = '';
    this.successMessage = '';
    this.isFormOpen = true;
    this.changeDetector.detectChanges();
    void this.content?.scrollToTop(300);
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.editingUserId = null;
    this.form = this.emptyForm();
  }

  async saveUser(): Promise<void> {
    if (!this.form.name.trim() || !this.form.email.trim() || this.isSaving || !this.editingUserId) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const user: UserInput = {
      name: this.form.name.trim(),
      email: this.form.email.trim(),
      phone: this.form.phone.trim(),
    };

    try {
      await this.usersService.updateUser(this.editingUserId, user);
      this.successMessage = 'Na-update ang user.';
      this.closeForm();
    } catch (error) {
      console.error('Unable to update user:', error);
      this.errorMessage = 'Hindi na-update ang user. Pakisubukan ulit.';
    } finally {
      this.isSaving = false;
      this.changeDetector.markForCheck();
    }
  }

  async deleteUser(user: User): Promise<void> {
    if (!window.confirm(`Burahin si ${user.name}?`)) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    try {
      await this.usersService.deleteUser(user.id);
      this.successMessage = 'Na-delete ang user.';
    } catch (error) {
      console.error('Unable to delete user:', error);
      this.errorMessage = 'Hindi na-delete ang user. Pakisubukan ulit.';
    } finally {
      this.changeDetector.markForCheck();
    }
  }

  private emptyForm(): UserInput {
    return { name: '', email: '', phone: '' };
  }
}
