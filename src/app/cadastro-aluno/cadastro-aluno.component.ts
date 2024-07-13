import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlunoInterface } from '../shared/interfaces/aluno.interface';
import { AlunosService } from '../shared/services/alunos.service';
import { CursoInterface } from '../shared/interfaces/curso.interface';
import { CursosService } from '../shared/services/cursos.service';

@Component({
  selector: 'app-cadastro-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.scss',
})
export class CadastroAlunoComponent implements OnInit {
  formCadastro!: FormGroup;
  idAluno: string | undefined;
  cursos!: Array<CursoInterface>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alunosService: AlunosService,
    private cursoService: CursosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idAluno = this.activatedRoute.snapshot.params['id'];

    this.formCadastro = new FormGroup({
      nomeCompleto: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      curso: new FormControl('', Validators.required),
    });

    if (this.idAluno) {
      this.alunosService.getAluno(this.idAluno).subscribe((retorno) => {
        if (retorno) {
          this.formCadastro.patchValue(retorno);
        }
      });
    }

    this.cursoService.getCursos().subscribe((retorno) => {
      this.cursos = retorno;
    });
  }

  submitForm() {
    if (this.formCadastro.valid) {
      if (this.idAluno) {
        console.log('editar');
        this.editar(this.formCadastro.value);
      } else {
        this.cadastrar(this.formCadastro.value);
      }
    } else {
      this.formCadastro.markAllAsTouched();
    }
  }

  cadastrar(aluno: AlunoInterface) {
    this.alunosService
      .postAluno(aluno)
      .subscribe((retorno) => console.log(retorno));
    window.alert('Aluno cadastrado com sucesso!');
    this.formCadastro.reset();
    this.router.navigate(['/alunos']);
  }

  editar(aluno: AlunoInterface) {
    aluno.id = this.idAluno!;
    this.alunosService
      .putAluno(aluno)
      .subscribe((retorno) => console.log(retorno));
    window.alert('Aluno alterado com sucesso!');
    this.formCadastro.reset();
    this.router.navigate(['/alunos']);
  }

  cancelar() {
    this.formCadastro.reset();
    this.router.navigate(['/alunos']);
  }
}
