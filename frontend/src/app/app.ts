import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material.imports';
@Component({
  imports: [RouterOutlet, ...MATERIAL_MODULES],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MEAN STACK DEMO');
}
