import { LoginService } from '../../../core/services/login.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);
  usuario = this.loginService.usuarioLogado?.email || '';

  constructor(private loginService: LoginService) {}

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Sair do Sistema',
        mensagem: 'Deseja mesmo sair do sistema?',
        btCancelar: 'Cancelar',
        btSair: 'Sair',
      },
    });
  }
}
