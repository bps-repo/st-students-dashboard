import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Modern Support Component
 *
 * Provides a contact form for users to get help and support
 * with a modern, responsive design.
 */
@Component({
    selector: 'app-support',
    imports: [CommonModule, FormsModule],
    templateUrl: './support.component.html',
    styleUrl: './support.component.scss'
})
export class SupportComponent {
  // Form data
  formData = {
    name: 'Helder Santiago',
    email: 'heldersantiago23@gmail.com',
    message: ''
  };

  // Support categories
  supportCategories = [
    { id: 'technical', label: 'Suporte Técnico', icon: 'pi pi-cog', active: true },
    { id: 'account', label: 'Conta e Acesso', icon: 'pi pi-user', active: false },
    { id: 'billing', label: 'Pagamentos', icon: 'pi pi-credit-card', active: false },
    { id: 'courses', label: 'Cursos e Materiais', icon: 'pi pi-book', active: false },
    { id: 'other', label: 'Outros Assuntos', icon: 'pi pi-question-circle', active: false }
  ];

  // FAQ items
  faqItems = [
    {
      question: 'Como posso agendar uma aula particular?',
      answer: 'Para agendar uma aula particular, acesse a seção "Professores", escolha o professor desejado e clique em "Agendar Aula".',
      expanded: false
    },
    {
      question: 'Como alterar minha senha?',
      answer: 'Acesse seu perfil no canto superior direito da tela, selecione "Configurações" e depois "Alterar Senha".',
      expanded: false
    },
    {
      question: 'Posso acessar as aulas em dispositivos móveis?',
      answer: 'Sim, nossa plataforma é responsiva e pode ser acessada em qualquer dispositivo com navegador web.',
      expanded: false
    },
    {
      question: 'Como obtenho meu certificado?',
      answer: 'Após concluir um nível, acesse a seção "Certificados" e clique em "Baixar Certificado" no nível correspondente.',
      expanded: false
    }
  ];

  /**
   * Toggles the expanded state of a FAQ item
   * @param item The FAQ item to toggle
   */
  toggleFaq(item: any): void {
    item.expanded = !item.expanded;
  }

  /**
   * Sets the active support category
   * @param categoryId The ID of the category to set as active
   */
  setActiveCategory(categoryId: string): void {
    this.supportCategories.forEach(category => {
      category.active = category.id === categoryId;
    });
  }

  /**
   * Submits the support form
   */
  submitForm(): void {
    console.log('Form submitted:', this.formData);
    // In a real application, this would send the form data to a backend service

    // Reset the message field after submission
    this.formData.message = '';

    // Show a success message (in a real app, this would be a toast or alert)
    alert('Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.');
  }
}
