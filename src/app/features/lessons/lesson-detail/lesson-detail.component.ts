import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, map, of} from 'rxjs';
import {MaterialService} from '../../../core/material.service';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MaterialType} from "../../../@types/material-type";
import {Material} from "../../../@types/material";

/**
 * Modern Materials Component
 *
 * Displays a list of study materials with filtering capabilities
 * and a modern, responsive design.
 */
@Component({
  selector: 'app-lesson-detail',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lesson-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonDetailComponent {
  // Materials data
  protected readonly materials$!: Observable<Material[]>;
  protected filteredMaterials$!: Observable<Material[]>;

  // Filter state
  protected activeFilter = signal('all');
  protected searchQuery = '';

  // Map each Material Type to a prime icon string
  protected readonly materialTypeMap: Map<MaterialType, string> = new Map([
    [MaterialType.TEXTBOOK, 'pi pi-file-pdf'],
    [MaterialType.VIDEO, 'pi pi-play'],
    [MaterialType.DOCUMENTATION, 'pi pi-file-pdf'],
    [MaterialType.QUIZ, 'pi pi-file-edit'],
    [MaterialType.ASSIGNMENT, 'pi pi-file-edit'],
    [MaterialType.EXAM, 'pi pi-file-edit'],
  ]);

  constructor(private readonly materialService: MaterialService) {
    this.materials$ = this.materialService.getMaterial();
    this.filteredMaterials$ = this.materials$;
  }

  /**
   * Returns the appropriate icon based on the material type
   * @param type The material type
   * @returns The PrimeNG icon class
   */
  protected getMaterialIconBasedOnType(type: MaterialType): string {
    return this.materialTypeMap.get(type) ?? 'pi pi-book';
  }

  /**
   * Sets the active filter for materials
   * @param filter The filter to apply ('all', 'document', 'video', 'exercise')
   */
  protected setFilter(filter: string): void {
    this.activeFilter.set(filter);
    this.applyFilters();
  }

  /**
   * Applies the current filters to the materials
   */
  protected applyFilters(): void {
    this.filteredMaterials$ = this.materials$.pipe(
      map(materials => {
        let filtered = materials;

        // Apply type filter
        if (this.activeFilter() !== 'all') {
          filtered = filtered.filter(material => {
            switch (this.activeFilter()) {
              case 'document':
                return material.type === MaterialType.TEXTBOOK ||
                  material.type === MaterialType.DOCUMENTATION;
              case 'video':
                return material.type === MaterialType.VIDEO;
              case 'exercise':
                return material.type === MaterialType.QUIZ ||
                  material.type === MaterialType.ASSIGNMENT ||
                  material.type === MaterialType.EXAM;
              default:
                return true;
            }
          });
        }

        // Apply search filter if there's a query
        if (this.searchQuery.trim()) {
          const query = this.searchQuery.toLowerCase();
          filtered = filtered.filter(material =>
            material.title?.toLowerCase().includes(query) ||
            material.description?.toLowerCase().includes(query)
          );
        }

        return filtered;
      })
    );
  }
}
