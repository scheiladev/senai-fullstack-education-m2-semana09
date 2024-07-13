import { Component, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  router = inject(Router);
  usuario = this.loginService.usuarioLogado?.email || '';

  constructor(private loginService: LoginService) {}

  sair() {
    if (window.confirm('Deseja sair do sistema?')) {
      this.loginService.deslogar();
      this.router.navigate(['/login']);
    } else {
      return;
    }
  }
}
