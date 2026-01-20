# Confirmation Dialog System

Sistema de diálogos de confirmação customizados usando Angular Material.

## 📁 Arquivos

- **Componente**: `src/app/shared/components/confirmation-dialog/confirmation-dialog.component.ts`
- **Serviço**: `src/app/shared/services/confirmation-dialog.service.ts`

## 🎨 Features

- ✅ Diálogos modais elegantes e modernos
- ✅ 4 tipos visuais: `info`, `warning`, `danger`, `success`
- ✅ Animações suaves e responsivo
- ✅ Ícones contextuais
- ✅ Totalmente customizável
- ✅ Substituição do `confirm()` nativo do navegador

## 🚀 Como Usar

### Método 1: Serviço Genérico

```typescript
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';

constructor(private confirmationDialog: ConfirmationDialogService) {}

showConfirmation() {
  this.confirmationDialog.confirm({
    title: 'Confirmar Ação',
    message: 'Tem certeza que deseja realizar esta ação?',
    confirmText: 'Sim, confirmar',
    cancelText: 'Cancelar',
    type: 'warning' // 'info' | 'warning' | 'danger' | 'success'
  }).subscribe(confirmed => {
    if (confirmed) {
      // Usuário confirmou
      console.log('Ação confirmada!');
    } else {
      // Usuário cancelou
      console.log('Ação cancelada');
    }
  });
}
```

### Método 2: Métodos Específicos

O serviço oferece métodos pré-configurados para casos comuns:

#### Confirmação de Inscrição em Evento
```typescript
this.confirmationDialog.confirmEnrollment('Workshop de Angular')
  .pipe(takeUntil(this.destroy$))
  .subscribe(confirmed => {
    if (confirmed) {
      // Realizar inscrição
    }
  });
```

#### Cancelamento de Inscrição
```typescript
this.confirmationDialog.confirmCancellation('Workshop de Angular')
  .pipe(takeUntil(this.destroy$))
  .subscribe(confirmed => {
    if (confirmed) {
      // Cancelar inscrição
    }
  });
```

#### Ação Perigosa
```typescript
this.confirmationDialog.confirmDanger(
  'Excluir Conta',
  'Esta ação não pode ser desfeita. Todos os seus dados serão perdidos.'
).subscribe(confirmed => {
  if (confirmed) {
    // Executar ação perigosa
  }
});
```

#### Confirmação de Sucesso
```typescript
this.confirmationDialog.confirmSuccess(
  'Operação Concluída',
  'Seus dados foram salvos com sucesso!'
).subscribe(confirmed => {
  // Usuário clicou em OK
});
```

## 🎨 Tipos Visuais

### Info (Azul)
- Ícone: `pi-info-circle`
- Uso: Informações gerais, confirmações neutras

### Warning (Laranja)
- Ícone: `pi-exclamation-triangle`
- Uso: Avisos, ações que requerem atenção

### Danger (Vermelho)
- Ícone: `pi-times-circle`
- Uso: Ações destrutivas, exclusões permanentes

### Success (Verde)
- Ícone: `pi-check-circle`
- Uso: Confirmações de sucesso, conclusões positivas

## 📝 Exemplo Completo: Eventos Component

```typescript
import { ConfirmationDialogService } from '../../shared/services/confirmation-dialog.service';
import { takeUntil } from 'rxjs';

export class EventsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private confirmationDialog: ConfirmationDialogService
  ) {}

  registerForEvent(eventId: string, eventTitle?: string): void {
    const title = eventTitle || 'este evento';
    
    this.confirmationDialog.confirmEnrollment(title)
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.student$.subscribe((student) => {
            if (student?.id) {
              this.store.dispatch(
                EventsActions.registerForEvent({ eventId, studentId: student.id })
              );
            }
          }).unsubscribe();
        }
      });
  }

  cancelRegistration(eventId: string, eventTitle?: string): void {
    const title = eventTitle || 'este evento';
    
    this.confirmationDialog.confirmCancellation(title)
      .pipe(takeUntil(this.destroy$))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.student$.subscribe((student) => {
            if (student?.id) {
              this.store.dispatch(
                EventsActions.cancelRegistration({ eventId, studentId: student.id })
              );
            }
          }).unsubscribe();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## 🎭 Interface de Configuração

```typescript
export interface ConfirmationDialogData {
  title: string;           // Título do diálogo
  message: string;         // Mensagem/descrição
  confirmText?: string;    // Texto do botão de confirmação (padrão: 'Confirmar')
  cancelText?: string;     // Texto do botão de cancelamento (padrão: 'Cancelar')
  type?: 'warning' | 'danger' | 'info' | 'success'; // Tipo visual (padrão: 'info')
}
```

## 🔧 Customização

### Largura e Responsividade
O diálogo é configurado com:
- Largura padrão: `450px`
- Largura máxima: `90vw` (responsivo)
- Classe CSS: `responsive-dialog`

### Animações
- Animação de pulso no ícone
- Transições suaves nos botões
- Efeito hover com elevação

## 📱 Mobile-Friendly

O diálogo é totalmente responsivo e se adapta automaticamente a telas pequenas:
- Em dispositivos móveis (<599px), ocupa toda a tela
- Mantém usabilidade em todas as resoluções
- Touch-friendly

## ⚠️ Boas Práticas

1. **Sempre use `takeUntil()` ou `take(1)`** para evitar vazamento de memória
2. **Forneça mensagens claras** sobre o que será confirmado
3. **Use o tipo apropriado** (`danger` para ações destrutivas)
4. **Teste em dispositivos móveis** para garantir boa UX

## 🔄 Migração do `confirm()` Nativo

### Antes (Browser Native):
```typescript
if (confirm('Tem certeza?')) {
  // fazer algo
}
```

### Depois (Dialog Component):
```typescript
this.confirmationDialog.confirm({
  title: 'Confirmar',
  message: 'Tem certeza?',
  type: 'warning'
}).subscribe(confirmed => {
  if (confirmed) {
    // fazer algo
  }
});
```

## 🎯 Benefícios

- ✅ **Visual consistente**: Design unificado em toda aplicação
- ✅ **Melhor UX**: Interface mais moderna e profissional
- ✅ **Customizável**: Fácil de adaptar para diferentes casos
- ✅ **Mobile-friendly**: Funciona perfeitamente em todos os dispositivos
- ✅ **Acessível**: Suporte a teclado e leitores de tela
- ✅ **Type-safe**: TypeScript garante segurança de tipos
