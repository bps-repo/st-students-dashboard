import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractService } from '../../core/services/contract.service';
import { StudentContract } from '../../core/models/Contract';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-contracts',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-contracts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentContractsComponent {
  private readonly contractService = inject(ContractService);

  contracts = signal<StudentContract[] | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // selector state
  selectedContractId = signal<string>('ALL');
  filteredContracts = computed(() => {
    const list = this.contracts() || [];
    const id = this.selectedContractId();
    if (id === 'ALL') return list;
    return list.filter(c => c.id === id);
  });

  today = new Date();

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);
    this.contractService.getMyContracts().subscribe({
      next: (data) => {
        // sort installments by installmentNumber ascending for each contract
        data?.forEach(c => c.installments?.sort((a,b) => a.installmentNumber - b.installmentNumber));
        const list = data || [];
        this.contracts.set(list);
        // if selected id no longer exists, reset to ALL or set to the first contract
        const selected = this.selectedContractId();
        if (selected !== 'ALL' && !list.some(c => c.id === selected)) {
          this.selectedContractId.set(list[0]?.id ?? 'ALL');
        }
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message || 'Erro ao carregar contratos');
        this.loading.set(false);
      }
    });
  }

  isOverdue(dueDate: string, status: string) {
    if (status === 'PAID') return false;
    const d = new Date(dueDate);
    return d.getTime() < this.today.getTime();
  }

  // Progress helpers
  getPaidCount(c: StudentContract): number {
    return c.installments?.filter(i => i.status === 'PAID').length || 0;
  }

  getOverdueCount(c: StudentContract): number {
    return c.installments?.filter(i => this.isOverdue(i.dueDate, i.status)).length || 0;
  }

  getPendingCount(c: StudentContract): number {
    const total = c.installments?.length || 0;
    return Math.max(0, total - this.getPaidCount(c) - this.getOverdueCount(c));
  }

  getProgressPercent(c: StudentContract): number {
    const total = c.installments?.length || 0;
    if (total === 0) return 0;
    const paid = this.getPaidCount(c);
    return Math.round((paid / total) * 100);
  }

  toCurrency(value: number | undefined | null): string {
    if (value == null) return '-';
    return new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value);
  }
}
