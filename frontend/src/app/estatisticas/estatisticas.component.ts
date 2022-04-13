import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../modelo/Pessoa';
import { PessoasService } from '../service/pessoas.service';

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  estadosComCadastros: string[] = [];

  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoasService) { }

  async ngOnInit(): Promise<void> {
    await this.listarPessoas();
    this.verificaEstadosComRegistros();
  }

  listarPessoas = () => {
    return new Promise(resolve => {
      this.pessoaService.listar()
        .subscribe(retorno => {
          this.pessoas = retorno;
          resolve(retorno);
        });
    })
  }

  verificaEstadosComRegistros() {
    this.estadosComCadastros = [...new Set(this.pessoas.map(p => p.estado))];
  }

  calculaTotalPessoasPorEstado(nomeEstado: string) {
    let totalDoEstado = 0
    for (let i = 0; i < this.pessoas.length; i++) {
      if (this.pessoas[i].estado == nomeEstado) {
        totalDoEstado++;
      }
    }
    return totalDoEstado;
  }
}
