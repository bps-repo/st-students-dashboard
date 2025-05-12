import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from "rxjs";
import {UserToken} from "../../core/models/userToken";
import {Store} from "@ngrx/store";
import {authSelectors} from "../../core/state/auth/auth.selectors";
import {User} from "../../core/models/User";
import {UserProfile} from "../../core/dtos/user-profile";
import {AuthActions} from "../../core/state/auth/authActions";

/**
 * Modern Profile Component
 *
 * Displays and allows editing of user profile information
 * with a modern, responsive design.
 */
@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  protected isLoading$!: Observable<boolean>
  protected errors$!: Observable<Partial<UserToken> | null>

  protected user$!: Observable<User | null>
  protected student!: Observable<UserProfile | null>
  protected userProfileForm!: FormGroup


  constructor(private store$: Store, private form: FormBuilder) {
    // Initialize loading and error observables
    this.isLoading$ = this.store$.select(authSelectors.loading);

    this.store$.dispatch(AuthActions.getUser());

    // Initialize the form with default values
    this.userProfileForm = this.form.group({
      birthdate: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      location: [''],
      country: [''],
      bio: [''],
      identificationNumber: [''],
      gender: [''],
      email: [''],
    });
  }

  ngOnInit() {
    // Subscribe to the user observable from the store
    this.user$.subscribe(user => {
      if (user) {
        console.log('user', user);
        this.userProfileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          birthdate: user.dateOfbirth,
          gender: user.gender,
        });
      }
    });
  }


  // Settings
  settings = {
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: 'pt-BR'
  };

  // Active tab
  activeTab = 'profile'; // 'profile', 'account', 'notifications'

  /**
   * Sets the active tab
   * @param tab The tab to set as active
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  /**
   * Saves the profile changes
   */
  saveChanges(): void {
    // Show success message (in a real app, this would be a toast notification)
    alert('Perfil atualizado com sucesso!');
  }

  /**
   * Discards the profile changes
   */
  discardChanges(): void {
    // Reset form data to match user profile

    // Show message (in a real app, this would be a toast notification)
    alert('Alterações descartadas!');
  }

  /**
   * Updates a setting
   * @param setting The setting to update
   * @param value The new value
   */
  updateSetting(setting: string, value: boolean): void {
    // Update the setting
    (this.settings as any)[setting] = value;

    // In a real app, this would call a service to update the settings
    console.log('Settings updated:', this.settings);
  }

  /**
   * Uploads a profile image
   */
  uploadProfileImage(): void {
    // In a real app, this would open a file picker and upload the image
    console.log('Uploading profile image');
    alert('Funcionalidade de upload de imagem será implementada em breve!');
  }

  /**
   * Uploads a cover image
   */
  uploadCoverImage(): void {
    // In a real app, this would open a file picker and upload the image
    console.log('Uploading cover image');
    alert('Funcionalidade de upload de imagem será implementada em breve!');
  }
}
