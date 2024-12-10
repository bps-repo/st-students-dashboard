import { Component } from '@angular/core';

@Component({
  selector: 'app-material-detail',
  standalone: true,
  imports: [],
  templateUrl: './material-detail.component.html',
  styleUrl: './material-detail.component.scss',
})
export class MaterialDetailComponent {
  protected listNumbers = new Array<number>(
    ...Array.from({ length: 50 }, (_, i) => i + 1),
  );
}
