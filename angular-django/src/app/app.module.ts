import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddLivroComponent } from './components/add-livro/add-livro.component';
import { LivroDetalheComponent } from './components/livro-detalhe/livro-detalhe.component';
import { LivroListaComponent } from './components/livro-lista/livro-lista.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddLivroComponent,
    LivroDetalheComponent,
    LivroListaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
