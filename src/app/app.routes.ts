import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlunosComponent } from './alunos/alunos.component';
import { CadastroAlunoComponent } from './cadastro-aluno/cadastro-aluno.component';
import { DisciplinasComponent } from './disciplinas/disciplinas.component';
import { usuarioLogadoGuard } from './shared/guards/usuario-logado.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'alunos',
    children: [
      { path: '', component: AlunosComponent },
      { path: 'cadastro-aluno', component: CadastroAlunoComponent },
      { path: 'cadastro-aluno/:id', component: CadastroAlunoComponent },
    ],
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: 'disciplinas',
    component: DisciplinasComponent,
    canActivate: [usuarioLogadoGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
