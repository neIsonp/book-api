import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css'],
})
export class LivroListaComponent implements OnInit {
  livro?: Livro[];
  livroCorrente: Livro = {};
  indexCorrente = -1;
  titulo = '';

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.retrieveLivro();
  }

  retrieveLivro(): void {
    this.livroService.getAll().subscribe({
      next: (data) => {
        this.livro = data;
      },
      error: (e) => console.log(e),
    });
  }

  refreshList(): void {
    this.retrieveLivro();
    this.livroCorrente = {};
    this.indexCorrente = -1;
  }

  setActiveLivro(livro: Livro, index: number): void {
    this.livroCorrente = livro;
    this.indexCorrente = index;
  }

  removeAllLivro(): void {
    this.livroService.deleteAll().subscribe({
      next: (res) => {
        this.refreshList();
      },
      error: (e) => console.log(e),
    });
  }

  searchTitulo(): void {
    this.livroCorrente = {};
    this.indexCorrente = -1;

    this.livroService.findByTitulo(this.titulo).subscribe({
      next: (data) => {
        this.livro = data;
      },
      error: (e) => console.log(e),
    });
  }
}
