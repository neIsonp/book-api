import { Component, OnInit } from '@angular/core';
import * as e from 'express';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-add-livro',
  templateUrl: './add-livro.component.html',
  styleUrls: ['./add-livro.component.css'],
})
export class AddLivroComponent implements OnInit {
  livro: Livro = {
    titulo: '',
    descricao: '',
    disponivel: false,
  };

  submitted = false;

  constructor(private LivroService: LivroService) {}

  saveLivro(): void {
    const data = {
      titulo: this.livro.titulo,
      descricao: this.livro.descricao,
    };

    this.LivroService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newLivro(): void {
    this.submitted = false;
    this.livro = {
      titulo: '',
      descricao: '',
      disponivel: false,
    };
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
