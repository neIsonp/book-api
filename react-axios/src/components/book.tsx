import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import BookService from "../services/book";
import IBook from "../types/book";

interface RouterProps {
  id: string;
}

type Props = RouteComponentProps<RouterProps>;

const Book: React.FC<Props> = (props) => {
  const initialBookState: IBook = {
    id: null,
    titulo: "",
    descricao: "",
    disponivel: false,
  };

  const [currentBook, setCurrentBook] = useState<IBook>(initialBookState);
  const [message, setMessage] = useState<string>("");

  const getBook = (id: string) => {
    BookService.get(id)
      .then((response: any) => {
        setCurrentBook(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBook(props.match.params.id);
  }, [props.match.params.id]);

  const onChangetitulo = (e: ChangeEvent<HTMLInputElement>) => {
    const titulo = e.target.value;
    setCurrentBook((prevState) => ({
      ...prevState,
      titulo: titulo,
    }));
  };

  const onChangedescricao = (e: ChangeEvent<HTMLInputElement>) => {
    const descricao = e.target.value;
    setCurrentBook((prevState) => ({
      ...prevState,
      descricao: descricao,
    }));
  };

  const updatedisponivel = (status: boolean) => {
    const data: IBook = {
      ...currentBook,
      disponivel: status,
    };

    BookService.update(data, currentBook.id)
      .then((response: any) => {
        setCurrentBook((prevState) => ({
          ...prevState,
          disponivel: status,
        }));
        setMessage("O estado foi atualizado com sucesso");
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateBook = () => {
    BookService.update(currentBook, currentBook.id)
      .then((response: any) => {
        console.log(response.data);
        setMessage("O Livro foi atualizado com sucesso");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteBook = () => {
    BookService.delete(currentBook.id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/books");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBook ? (
        <div className="edit-form">
          <h4>Livro</h4>
          <form>
            <div className="form-group">
              <label htmlFor="titulo">Titulo</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                value={currentBook.titulo}
                onChange={onChangetitulo}
              />
            </div>
            <div className="form-group">
              <label htmlFor="descricao">Descricao</label>
              <input
                type="text"
                className="form-control"
                id="descricao"
                value={currentBook.descricao}
                onChange={onChangedescricao}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBook.disponivel ? "Disponivel" : "Indisponivel"}
            </div>
          </form>

          {currentBook.disponivel ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatedisponivel(false)}
            >
              Indisponivel
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatedisponivel(true)}
            >
              Disponivel
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBook}>
            Apagar
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBook}
          >
            Atualizar
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Clique no Livro.</p>
        </div>
      )}
    </div>
  );
};

export default Book;
