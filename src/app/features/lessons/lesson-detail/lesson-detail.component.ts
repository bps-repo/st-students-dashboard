import {ChangeDetectionStrategy, Component, computed, inject, signal, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable, map} from 'rxjs';
import {MaterialService} from '../../../core/material.service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MaterialType} from "../../../@types/material-type";
import {Material} from "../../../@types/material";
import {Store} from '@ngrx/store';
import {LessonsEntitySelectors, LessonsSelectors} from '../../../core/state/lessons/lessons.selectors';
import {LessonSchedule, LessonScheduleStatus} from '../../../core/models/LessonSchedule';
import {LessonsActions} from '../../../core/state/lessons/lessons.actions';
import {LessonMaterialsSelectors} from '../../../core/state/lesson-materials/lesson-materials.selectors';
import {LessonMaterialsActions} from '../../../core/state/lesson-materials/lesson-materials.actions';
import {LessonMaterial, MaterialType as LessonMaterialType, FileType} from '../../../core/models/LessonMaterial';
import {CircularLoaderComponent} from '../../../shared/circular-loader/circular-loader.component';

@Component({
  selector: 'app-unit-detail',
  imports: [CommonModule, RouterModule, FormsModule, CircularLoaderComponent],
  templateUrl: './lesson-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LessonDetailComponent implements OnInit {
  // Materials data
  protected readonly materials$!: Observable<Material[]>;
  protected filteredMaterials$!: Observable<Material[]>;

  // Lesson materials data
  protected lessonMaterials$!: Observable<LessonMaterial[]>;
  protected filteredLessonMaterials$!: Observable<LessonMaterial[]>;

  // Filter state
  protected activeFilter = signal('all');
  protected searchQuery = '';

  // Lesson state
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  protected lessonId = this.route.snapshot.paramMap.get('id') as string;
  protected lesson$: Observable<LessonSchedule | undefined> = this.store.select(LessonsEntitySelectors.selectLessonById(this.lessonId));
  protected isLoadingLessons$ = this.store.select(LessonsSelectors.selectLessonsLoading);
  protected isLoadingMaterials$ = this.store.select(LessonMaterialsSelectors.selectMaterialsLoading(this.lessonId));

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
    // ensure lessons are loaded in case of direct navigation
    this.store.dispatch(LessonsActions.loadLessons({ status: undefined }));

    this.materials$ = this.materialService.getMaterial();
    this.filteredMaterials$ = this.materials$;

    // Initialize lesson materials
    this.lessonMaterials$ = this.store.select(LessonMaterialsSelectors.selectMaterialsByLesson(this.lessonId));
    this.filteredLessonMaterials$ = this.lessonMaterials$;
  }

  ngOnInit(): void {
    // Load lesson materials when component initializes
    this.store.dispatch(LessonMaterialsActions.loadLessonMaterials({ lessonId: this.lessonId }));
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
   * Returns the appropriate icon based on the lesson material file type
   * @param fileType The file type
   * @returns The PrimeNG icon class
   */
  protected getLessonMaterialIcon(fileType: FileType): string {
    const iconMap: { [key in FileType]: string } = {
      [FileType.VIDEO]: 'pi pi-play',
      [FileType.PDF]: 'pi pi-file-pdf',
      [FileType.DOCUMENT]: 'pi pi-file',
      [FileType.IMAGE]: 'pi pi-image',
      [FileType.AUDIO]: 'pi pi-volume-up',
      [FileType.LINK]: 'pi pi-external-link',
      [FileType.OTHER]: 'pi pi-file'
    };
    return iconMap[fileType] ?? 'pi pi-file';
  }

  /**
   * Returns the appropriate color class based on the material type
   * @param type The material type
   * @returns The CSS color class
   */
  protected getMaterialTypeColor(type: LessonMaterialType): string {
    const colorMap: { [key in LessonMaterialType]: string } = {
      [LessonMaterialType.GENERAL_CONTENT]: 'bg-blue-100 text-blue-800',
      [LessonMaterialType.EXERCISE]: 'bg-green-100 text-green-800',
      [LessonMaterialType.ASSIGNMENT]: 'bg-purple-100 text-purple-800',
      [LessonMaterialType.REFERENCE]: 'bg-yellow-100 text-yellow-800',
      [LessonMaterialType.SUPPLEMENTARY]: 'bg-gray-100 text-gray-800'
    };
    return colorMap[type] ?? 'bg-gray-100 text-gray-800';
  }

  /**
   * Returns the material type label in Portuguese
   * @param type The material type
   * @returns The Portuguese label
   */
  protected getMaterialTypeLabel(type: LessonMaterialType): string {
    const labelMap: { [key in LessonMaterialType]: string } = {
      [LessonMaterialType.GENERAL_CONTENT]: 'Conteúdo Geral',
      [LessonMaterialType.EXERCISE]: 'Exercício',
      [LessonMaterialType.ASSIGNMENT]: 'Tarefa',
      [LessonMaterialType.REFERENCE]: 'Referência',
      [LessonMaterialType.SUPPLEMENTARY]: 'Complementar'
    };
    return labelMap[type] ?? type;
  }

  /**
   * Checks if a material is currently available based on availability dates
   * @param material The lesson material
   * @returns True if the material is available
   */
  protected isMaterialAvailable(material: LessonMaterial): boolean {
    const now = new Date();
    const startDate = new Date(material.availabilityStartDate);
    const endDate = new Date(material.availabilityEndDate);

    return now >= startDate && now <= endDate && material.active;
  }

  /**
   * Opens a material link in a new tab
   * @param url The material URL
   */
  protected openMaterial(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
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
