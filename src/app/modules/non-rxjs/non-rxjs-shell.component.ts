import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-non-rxjs',
  templateUrl: './non-rxjs-shell.conmponent.html',
  styleUrls: ['./non-rxjs-shell.component.css']
})
export class NonRxjsShellComponent  {
  @Input() name: string;
}