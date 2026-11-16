import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MATERIAL_MODULES } from './shared/material.imports';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
@Component({
  imports: [RouterOutlet, MainLayoutComponent, ...MATERIAL_MODULES],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MEAN STACK DEMO');
}
