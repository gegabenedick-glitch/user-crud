import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserInput } from '../users.models';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  private readonly usersService = inject(UsersService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  isSaving = false;
  errorMessage = '';
  successMessage = '';
  form: UserInput = this.emptyForm();

  async saveUser(): Promise<void> {
    if (!this.form.name.trim() || !this.form.email.trim() || this.isSaving) {
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
      await this.usersService.addUser(user);
      this.successMessage = 'Naidagdag ang user.';
      this.form = this.emptyForm();
    } catch (error) {
      console.error('Unable to save user:', error);
      this.errorMessage = 'Hindi na-save ang user. Pakisubukan ulit.';
    } finally {
      this.isSaving = false;
      this.changeDetector.markForCheck();
    }
  }

  private emptyForm(): UserInput {
    return { name: '', email: '', phone: '' };
  }
}
