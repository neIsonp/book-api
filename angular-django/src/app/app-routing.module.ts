import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivroListaComponent } from './components/livro-lista/livro-lista.component';
import { LivroDetalheComponent } from './components/livro-detalhe/livro-detalhe.component';
import { AddLivroComponent } from './components/add-livro/add-livro.component';

const routes: Routes = [
  { path: '', redirectTo: 'livro', pathMatch: 'full' },
  { path: 'livro', component: LivroListaComponent },
  { path: 'livro/:id', component: LivroDetalheComponent },
  { path: 'add', component: AddLivroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
