import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from 'src/app/models/livro.model';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-detalhe',
  templateUrl: './livro-detalhe.component.html',
  styleUrls: ['./livro-detalhe.component.css'],
})
export class LivroDetalheComponent {
  @Input() viewMode = false;

  @Input() livroCorrente: Livro = {
    titulo: '',
    descricao: '',
    disponivel: false,
  };

  message = '';

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getLivro(this.route.snapshot.params['id']);
    }
  }

  getLivro(id: string): void {
    this.livroService.get(id).subscribe({
      next: (data) => {
        this.livroCorrente = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateDisponivel(status: boolean): void {
    const data = {
      titulo: this.livroCorrente.titulo,
      descricao: this.livroCorrente.descricao,
      disponivel: status,
    };

    this.message = '';

    this.livroService.update(this.livroCorrente.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.livroCorrente.disponivel = status;
        this.message = res.message
          ? res.message
          : 'O estado foi atualizado com sucesso!';
      },
      error: (e) => console.error(e),
    });
  }

  updateLivro(): void {
    this.message = '';

    this.livroService
      .update(this.livroCorrente.id, this.livroCorrente)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'Este livro foi atualizado com sucesso!';
        },
        error: (e) => console.error(e),
      });
  }

  deleteLivro(): void {
    this.livroService.delete(this.livroCorrente.id).subscribe({
      next: (res) => {
        this.router.navigate(['/livro']);
      },
      error: (e) => console.error(e),
    });
  }
}
