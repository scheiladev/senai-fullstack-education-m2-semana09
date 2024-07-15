import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  readonly dialog = inject(MatDialog);

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
    });
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      data: {
        titulo: 'Cadastro',
        mensagem: 'As instruções de cadastro foram enviadas para seu email.',
        btSair: 'Sair',
      },
    });
  }

  entrar() {
    if (this.formLogin.value) {
      const retorno = this.loginService.logar(this.formLogin.value);
      if (retorno) {
        this.router.navigate(['/home']);
      } else {
        this.formLogin.reset();
      }
    } else {
      window.alert('Por favor, preencha os campos');
    }
  }

  cadastrar() {
    window.alert(
      'Processo de recuperação de senha enviado para o e-mail cadastrado!'
    );
  }
}
