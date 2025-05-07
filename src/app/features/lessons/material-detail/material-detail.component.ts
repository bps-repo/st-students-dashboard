import { Component, OnInit, signal } from '@angular/core';
import { YoutubePlayerComponent } from '../../../shared/components/youtube-player/youtube-player.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../../../core/material.service';
import { map, of, switchMap } from 'rxjs';
import {Material} from "../../../@types/material";
import {MaterialType} from "../../../@types/material-type";

/**
 * Modern Material Detail Component
 *
 * Displays detailed information about a specific learning material
 * with a modern, responsive design that adapts based on material type.
 */
@Component({
    selector: 'app-material-detail',
    imports: [YoutubePlayerComponent, CommonModule],
    templateUrl: './material-detail.component.html',
    styleUrl: './material-detail.component.scss'
})
export class MaterialDetailComponent implements OnInit {
  // Material data
  protected material: Material | null = null;
  protected materialType = signal<MaterialType | null>(null);
  protected loading = signal(true);
  protected error = signal<string | null>(null);

  // Material type enum for template access
  protected readonly MaterialType = MaterialType;

  // UI state
  protected activeTab = signal(0);

  // Array of numbers for the ordinal numbers example
  protected listNumbers = new Array<number>(
    ...Array.from({ length: 50 }, (_, i) => i + 1),
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    // Get the material ID from the route parameters
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.error.set('Material ID not found');
          return of(null);
        }

        // Convert ID to number and validate
        const materialId = parseInt(id, 10);
        if (isNaN(materialId)) {
          this.error.set('Invalid material ID');
          return of(null);
        }

        // Get all materials and find the one with the matching ID
        return this.materialService.getMaterial().pipe(
          map(materials => {
            if (materialId >= 0 && materialId < materials.length) {
              return materials[materialId];
            }
            this.error.set('Material not found');
            return null;
          })
        );
      })
    ).subscribe({
      next: (material) => {
        this.loading.set(false);
        if (material) {
          this.material = material;
          this.materialType.set(material.type);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Error loading material: ' + err.message);
      }
    });
  }

  /**
   * Returns the appropriate icon based on the material type
   * @param type The material type
   * @returns The PrimeNG icon class
   */
  protected getMaterialIcon(type: MaterialType | null): string {
    if (type === null) return 'pi pi-book';

    switch (type) {
      case MaterialType.TEXTBOOK:
      case MaterialType.DOCUMENTATION:
        return 'pi pi-file-pdf';
      case MaterialType.VIDEO:
        return 'pi pi-play';
      case MaterialType.QUIZ:
      case MaterialType.ASSIGNMENT:
      case MaterialType.EXAM:
        return 'pi pi-file-edit';
      default:
        return 'pi pi-book';
    }
  }

  /**
   * Returns the material type category (document, video, exercise)
   * @param type The material type
   * @returns The category as a string
   */
  protected getMaterialCategory(type: MaterialType | null): string {
    if (type === null) return 'unknown';

    if (type === MaterialType.TEXTBOOK || type === MaterialType.DOCUMENTATION) {
      return 'document';
    } else if (type === MaterialType.VIDEO) {
      return 'video';
    } else if (type === MaterialType.QUIZ || type === MaterialType.ASSIGNMENT || type === MaterialType.EXAM) {
      return 'exercise';
    }
    return 'unknown';
  }

  /**
   * Returns the material type name
   * @param type The material type
   * @returns The type name as a string
   */
  protected getMaterialTypeName(type: MaterialType | null): string {
    if (type === null) return 'Unknown';

    switch (type) {
      case MaterialType.TEXTBOOK:
        return 'Textbook';
      case MaterialType.VIDEO:
        return 'Video';
      case MaterialType.DOCUMENTATION:
        return 'Documentation';
      case MaterialType.QUIZ:
        return 'Quiz';
      case MaterialType.ASSIGNMENT:
        return 'Assignment';
      case MaterialType.EXAM:
        return 'Exam';
      default:
        return 'Unknown';
    }
  }

  /**
   * Sets the active tab for exercise materials
   * @param index The tab index to set active
   */
  protected setActiveTab(index: number): void {
    this.activeTab.set(index);
  }

  /**
   * Returns the ordinal suffix for a number (1st, 2nd, 3rd, etc.)
   * @param num The number to get the ordinal suffix for
   * @returns The number with its ordinal suffix
   */
  protected getOrdinalSuffix(num: number): string {
    const j = num % 10;
    const k = num % 100;

    if (j === 1 && k !== 11) {
      return num + "st";
    }
    if (j === 2 && k !== 12) {
      return num + "nd";
    }
    if (j === 3 && k !== 13) {
      return num + "rd";
    }
    return num + "th";
  }

  /**
   * Navigates to the previous or next material
   * @param direction 'prev' or 'next'
   */
  protected navigateMaterial(direction: 'prev' | 'next'): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) return of(null);

        const materialId = parseInt(id, 10);
        if (isNaN(materialId)) return of(null);

        return this.materialService.getMaterial().pipe(
          map(materials => {
            const newId = direction === 'next'
              ? Math.min(materialId + 1, materials.length - 1)
              : Math.max(materialId - 1, 0);

            if (newId !== materialId) {
              this.router.navigate(['/lessons/materials', newId]);
            }
            return null;
          })
        );
      })
    ).subscribe();
  }
}
