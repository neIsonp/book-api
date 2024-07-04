import React, { useState, ChangeEvent } from "react";
import BookService from "../services/book";
import IBook from "../types/book";

type Props = {};

const AddBook: React.FC<Props> = () => {
  const [book, setbook] = useState<IBook>({
    id: null,
    titulo: "",
    descricao: "",
    disponivel: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setbook({ ...book, titulo: value });
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setbook({ ...book, descricao: value });
  };

  const savebook = () => {
    const data: IBook = {
      titulo: book.titulo,
      descricao: book.descricao,
    };

    BookService.create(data)
      .then((response: any) => {
        setbook({
          id: response.data.id,
          titulo: response.data.titulo,
          descricao: response.data.descricao,
          disponivel: response.data.disponivel,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newbook = () => {
    setbook({
      id: null,
      titulo: "",
      descricao: "",
      disponivel: false,
    });
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>O livro foi criado</h4>
          <button className="btn btn-success" onClick={newbook}>
            Adicionar
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Titulo</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              required
              value={book.titulo}
              onChange={onChangeTitle}
              name="titulo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="Descricao">Descrição</label>
            <input
              type="text"
              className="form-control"
              id="Descricao"
              required
              value={book.descricao}
              onChange={onChangeDescription}
              name="Descricao"
            />
          </div>

          <button onClick={savebook} className="btn btn-success">
            Criar
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBook;
