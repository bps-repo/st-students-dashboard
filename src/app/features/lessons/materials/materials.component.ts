import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Material } from '../../@types/material';
import { MaterialType } from '../../@types/material-type';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { MaterialService } from '../../../core/material.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsComponent {
  protected readonly materials$!: Observable<Material[]>;

  // Map each Material Type to a prime icon string
  protected readonly materialTypeMap: Map<MaterialType, string> = new Map([
    [MaterialType.TEXTBOOK, 'pi pi-file-pdf'],
    [MaterialType.VIDEO, 'pi pi-play'],
    [MaterialType.DOCUMENTATION, 'pi pi-file-pdf'],
    [MaterialType.QUIZ, 'pi pi-file-edit'],
    [MaterialType.ASSIGNMENT, 'pi-file-edit'],
    [MaterialType.EXAM, 'pi pi-file-edit'],
  ]);

  constructor(private readonly materialService: MaterialService) {
    this.materials$ = this.materialService.getMaterial();
  }

  protected getMaterialIconBasedOnType(type: MaterialType): string {
    return this.materialTypeMap.get(type) ?? 'pi pi-book';
  }
}
