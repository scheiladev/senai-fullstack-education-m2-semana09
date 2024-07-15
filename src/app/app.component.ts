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

  modalSenha = {
    titulo: 'Recuperação de senha',
    mensagem:
      'Uma mensagem com sua senha foi enviada para seu email de cadastro.',
  };

  constructor(private router: Router) {
    this.router.events.subscribe((retorno) => {
      if (retorno instanceof NavigationEnd) {
        this.isAppPage = !this.router.url.includes('login');
      }
    });
  }
}
