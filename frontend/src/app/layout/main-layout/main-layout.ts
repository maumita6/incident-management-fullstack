// main-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './../../shared/nav-bar/nav-bar';
import { IncidentsDashboard } from './../../features/incidents/incidents-dashboard/incidents-dashboard/incidents-dashboard';

@Component({
  imports: [NavbarComponent, RouterOutlet],
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {


}
