import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AlunosComponent } from './pages/alunos/alunos.component';
import { CadastroAlunoComponent } from './pages/cadastro-aluno/cadastro-aluno.component';
import { DisciplinasComponent } from './pages/disciplinas/disciplinas.component';
import { usuarioLogadoGuard } from './core/guards/usuario-logado.guard';

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
