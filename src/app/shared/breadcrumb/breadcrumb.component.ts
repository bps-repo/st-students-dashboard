import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Breadcrumb, BreadcrumbService} from "../services/BreadcrumbService";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="flex items-center space-x-2 bg-white bg-opacity-5 px-4 py-2 rounded-lg"
         *ngIf="(breadcrumbs$ | async)?.length">
      <ng-container *ngFor="let breadcrumb of (breadcrumbs$ | async); let last = last; let first = first">
        <a [routerLink]="breadcrumb.url"
           [class.font-semibold]="last"
           class="text-white hover:text-white hover:underline transition-all">
          {{ breadcrumb.label }}
        </a>
        <i *ngIf="!last" class="pi pi-chevron-right text-xs text-white opacity-70"></i>
      </ng-container>
    </div>
  `,
  styles: [`
    .breadcrumb-container {
      padding: 8px 16px;
      background-color: #f8f9fa;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .breadcrumb {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
    }

    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
    }

    .breadcrumb-item a {
      color: #007bff;
      text-decoration: none;
      font-size: 14px;
    }

    .breadcrumb-item a.active {
      color: #6c757d;
      font-weight: 500;
      pointer-events: none;
    }

    .separator {
      color: #6c757d;
      margin: 0 8px;
    }
  `]
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
  }

  ngOnInit(): void {
  }
}
