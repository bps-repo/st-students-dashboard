import {Component, Input} from '@angular/core';
import {Observable, of} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-loader',
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input()
  loading: Observable<boolean> = of(false)

  @Input()
  label: string = "Carregando..."
}
