// services/book.service.ts

import { Book } from "../entity/books.model";

export class BookService {
  constructor(private dataAccess: DataAccess) {}

  async getBook(id: number): Promise<Book> {
    return this.dataAccess.getBook(id);
  }

  async createBook(book: Book) {
    return this.dataAccess.createBook(book);
  }
}
