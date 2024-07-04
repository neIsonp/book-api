import http from "../utils/http-common";
import IBook from "../types/book";

class BookService {
  getAll() {
    return http.get<Array<IBook>>("/livros");
  }

  get(id: string) {
    return http.get<IBook>(`/livros/${id}`);
  }

  create(data: IBook) {
    return http.post<IBook>("/livros", data);
  }

  update(data: IBook, id: any) {
    return http.put<any>(`/livros/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/livros/${id}`);
  }

  deleteAll() {
    return http.delete<any>(`/livros`);
  }

  findByTitle(title: string) {
    return http.get<Array<IBook>>(`/livros?titulo=${title}`);
  }
}

export default new BookService();
