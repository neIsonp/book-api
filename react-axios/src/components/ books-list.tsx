import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/book";
import IBook from "../types/book";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Array<IBook>>([]);
  const [currentBook, setCurrentBook] = useState<IBook | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchTitle, setSearchTitle] = useState<string>("");

  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  const retrieveBooks = () => {
    BookService.getAll()
      .then((response: any) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBooks();
    setCurrentBook(null);
    setCurrentIndex(-1);
  };

  const setActiveBook = (book: IBook, index: number) => {
    setCurrentBook(book);
    setCurrentIndex(index);
  };

  const removeAllbooks = () => {
    BookService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const searchTitleFunction = () => {
    setCurrentBook(null);
    setCurrentIndex(-1);

    BookService.findByTitle(searchTitle)
      .then((response: any) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquise por nome"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={searchTitleFunction}
            >
              Pesquisar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Livros</h4>

        <ul className="list-group">
          {books &&
            books.map((book: IBook, index: number) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBook(book, index)}
                key={index}
              >
                {book.titulo}
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-danger" onClick={removeAllbooks}>
          Apagar Tudo
        </button>
      </div>
      <div className="col-md-6">
        {currentBook ? (
          <div>
            <h4>Livro</h4>
            <div>
              <label>
                <strong>Titulo:</strong>
              </label>
              {currentBook.titulo}
            </div>
            <div>
              <label>
                <strong>Descrição:</strong>
              </label>{" "}
              {currentBook.descricao}
            </div>
            <div>
              <label>
                <strong>Estado:</strong>
              </label>
              {currentBook.disponivel ? "Disponivel" : "Indisponivel"}
            </div>

            <Link
              to={"/books/" + currentBook.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um livro para ver os detalhes</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
