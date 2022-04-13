import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EstatisticasComponent } from './estatisticas/estatisticas.component';

const routes: Routes = [
  {path:'', redirectTo:'cadastro', pathMatch:'full'},
  {path:'cadastro', component: CadastroComponent},
  {path:'estatisticas', component: EstatisticasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
