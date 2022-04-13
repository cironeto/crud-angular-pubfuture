import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Cidade } from '../modelo/Cidade';
import { Estado } from '../modelo/Estado';
import { Pessoa } from '../modelo/Pessoa';
import { CidadesService } from '../service/cidades.service';
import { PessoasService } from '../service/pessoas.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  btnVisivel: boolean = true;

  indicePessoaSelecionada: number = -1;

  pessoas: Pessoa[] = [];

  cidades: Cidade[] = [];

  estados: Estado[] = [];

  objPessoa: Pessoa = new Pessoa();

  constructor(private pessoaService: PessoasService, private CidadeService: CidadesService) { }

  ngOnInit(): void {
    this.listarPessoas();
    this.listarEstados();
  }

  formulario = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Zà-úÀ-Ú_ ]*$')]),
    email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    telefone: new FormControl(null, [Validators.required]),
    estado: new FormControl(null, [Validators.required]),
    cidade: new FormControl(null, [Validators.required])
  });

  verificaSeValidETouched(campo: string) {
    return !this.formulario.get(campo)!.valid && this.formulario.get(campo)?.touched;
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      this.cadastrarPessoa();
    } else {
      AppComponent.sweetAlertCamposVazios();
    }
  }

  cadastrarPessoa = () => {
    if (this.verificaNomeExistente(this.formulario.value.nome)) {
      this.pessoaService.cadastrar(this.formulario.value)
        .subscribe(retorno => this.pessoas.push(retorno));

      this.cancelar();
    }
  }

  verificaNomeExistente = (nomeInserido: string) => {
    if (this.pessoas.find(obj => obj.nome === nomeInserido)! == undefined) {
      return true;
    }
    return AppComponent.sweetAlertNomeExistente();
  }

  alterarPessoa = () => { 
    if (this.formulario.valid) {
      if(this.formulario.value.nome == this.objPessoa.nome){
        this.objPessoa = this.formulario.value;
        this.pessoaService.alterar(this.objPessoa.id, this.objPessoa)
          .subscribe(() => this.pessoas[this.indicePessoaSelecionada] = this.objPessoa);
        this.cancelar();
      }else{
        AppComponent.sweetAlertNomeExistente();
      }
      
    }
  }

  removerPessoa = () => {
    this.objPessoa = this.formulario.value;
    this.pessoaService.remover(this.objPessoa.id)
      .subscribe(() => this.pessoas.splice(this.indicePessoaSelecionada, 1));
    this.cancelar();
  }

  cancelar = () => {
    this.btnVisivel = true;
    this.formulario.reset();
  }

  listarPessoas = () => {
    this.pessoaService.listar()
      .subscribe(retorno => this.pessoas = retorno);
  }

  selecionarPessoa = async (id: number) => {
    this.btnVisivel = false;

    this.objPessoa = this.pessoas.find(obj => obj.id === id)!;
    this.indicePessoaSelecionada = this.pessoas.findIndex(obj => obj.id === id)!;

    await this.listarCidadesAlterar();

    this.formulario.setValue(this.objPessoa);
  }

  listarEstados = () => {
    this.CidadeService.listarEstados()
      .subscribe(retorno => this.estados = retorno);
  }

  listarCidadesCadastrar = () => {
    this.CidadeService.listarCidades(this.formulario.value.estado)
      .subscribe(retorno => this.cidades = retorno);
  }

  listarCidadesAlterar = () => {
    return new Promise((resolve) => {
      this.CidadeService.listarCidades(this.objPessoa.estado)
        .subscribe(retorno => {
          this.cidades = retorno;
          resolve(retorno);
        });
    })
  }
}
