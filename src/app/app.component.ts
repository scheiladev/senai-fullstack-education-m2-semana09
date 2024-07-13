import { Component, Input } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @Input() isAppPage = true;

  constructor(private router: Router) {
    this.router.events.subscribe((retorno) => {
      if (retorno instanceof NavigationEnd) {
        this.isAppPage = !this.router.url.includes('login');
      }
    });
  }
}
