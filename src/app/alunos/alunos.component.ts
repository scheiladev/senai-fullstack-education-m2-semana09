import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlunoInterface } from '../shared/interfaces/aluno.interface';
import { AlunosService } from '../shared/services/alunos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alunos',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
})
export class AlunosComponent implements OnInit {
  textoPesquisa: string | undefined;
  listaAlunos: Array<AlunoInterface> = [];
  pesquisaAlunos: Array<AlunoInterface> = [];

  constructor(private alunosService: AlunosService, private router: Router) {}

  ngOnInit(): void {
    this.alunosService.getAlunos().subscribe((retorno) => {
      retorno.forEach((aluno) => {
        this.listaAlunos.push(aluno);
      });
    });
    this.pesquisaAlunos = this.listaAlunos;
  }

  pesquisar() {
    if (this.textoPesquisa) {
      this.pesquisaAlunos = this.listaAlunos.filter(
        (aluno) =>
          aluno.nomeCompleto
            .toUpperCase()
            .includes(this.textoPesquisa!.toUpperCase()) ||
          aluno.email.toUpperCase().includes(this.textoPesquisa!.toUpperCase())
      );
    } else {
      this.pesquisaAlunos = this.listaAlunos;
    }
  }

  cadastrar() {
    this.router.navigate(['alunos/cadastro-aluno']);
  }

  editar(id: string) {
    this.router.navigate(['alunos/cadastro-aluno', id]);
  }

  excluir(id: string) {
    if (window.confirm('Quer mesmo excluir este usuário?')) {
      this.alunosService.delete(id).subscribe(() => {
        this.pesquisaAlunos = this.listaAlunos.filter(
          (aluno) => aluno.id !== id
        );
      });
      window.alert('Aluno excluído com sucesso!');
    }
  }
}
