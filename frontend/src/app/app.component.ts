import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  static sweetAlertNomeExistente() {
    Swal.fire({
      icon: 'error',
      title: 'Cadastro inválido',
      text: 'Esse nome já é cadastrado!'
    })
  }

  static sweetAlertCamposVazios() {
    Swal.fire({
      icon: 'error',
      title: 'Formulário inválido',
      text: 'Todos os campos são obrigatórios!'
    })
  }
}
