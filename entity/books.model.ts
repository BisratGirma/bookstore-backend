import { Pool } from "pg";

export interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: Date;
  genre: string;
  price: number;
}

const pool = new Pool();

async function getBook(id: number): Promise<Book> {
  const client = await pool.connect();

  const result = await client.query("SELECT * FROM books WHERE id=$1", [id]);

  const book = result.rows[0];

  client.release();

  return book;
}

async function createBook(book: Book) {
  const client = await pool.connect();

  await client.query(
    "INSERT INTO books(title, author, publicationDate, genre, price) VALUES($1, $2, $3, $4, $5)",
    [book.title, book.author, book.publicationDate, book.genre, book.price]
  );

  client.release();
}
