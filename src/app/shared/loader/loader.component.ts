import {Component, Input} from '@angular/core';
import {Observable, of} from "rxjs";
import { NgIf} from "@angular/common";
import {PushPipe} from "@ngrx/component";

@Component({
  selector: 'app-loader',
  imports: [
    NgIf,
    PushPipe
  ],
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  @Input()
  loading: Observable<boolean> = of(false)

  @Input()
  label: string = "Carregando..."
}
