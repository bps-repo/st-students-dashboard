import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Modern Profile Component
 *
 * Displays and allows editing of user profile information
 * with a modern, responsive design.
 */
@Component({
    selector: 'app-profile',
    imports: [CommonModule, FormsModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  // User profile data
  userProfile = {
    name: 'Helder Santiago',
    email: 'heldersantiago23@gmail.com',
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo, Brasil',
    language: 'Português, English',
    level: 'C1 - Advanced',
    bio: 'Estudante de inglês apaixonado por aprender novas línguas e culturas.'
  };

  // Form fields
  formData = {
    firstName: 'Helder',
    lastName: 'Santiago',
    email: 'heldersantiago23@gmail.com',
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo',
    country: 'Brasil'
  };

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
    // In a real app, this would call a service to update the profile
    console.log('Saving profile changes:', this.formData);

    // Update the displayed profile data
    this.userProfile.name = `${this.formData.firstName} ${this.formData.lastName}`;
    this.userProfile.email = this.formData.email;
    this.userProfile.phone = this.formData.phone;
    this.userProfile.location = `${this.formData.location}, ${this.formData.country}`;

    // Show success message (in a real app, this would be a toast notification)
    alert('Perfil atualizado com sucesso!');
  }

  /**
   * Discards the profile changes
   */
  discardChanges(): void {
    // Reset form data to match user profile
    this.formData = {
      firstName: this.userProfile.name.split(' ')[0],
      lastName: this.userProfile.name.split(' ').slice(1).join(' '),
      email: this.userProfile.email,
      phone: this.userProfile.phone,
      location: this.userProfile.location.split(',')[0].trim(),
      country: this.userProfile.location.split(',')[1]?.trim() || 'Brasil'
    };

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
