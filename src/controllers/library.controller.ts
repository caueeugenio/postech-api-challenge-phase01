import { Request, Response } from "express";
import bookSchema from "../schemas/book.schema";
import publisherSchema from "../schemas/publisher.schema";

export default class LibraryController {
  public async get(req: Request, res: Response) {
    const books = await bookSchema.find();
    return res.send(books);
  }

  public async getById(req: Request, res: Response) {
    const currentBook = await bookSchema.findById(req.params.id);
    if (!currentBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    return res.send(currentBook);
  }

  public async post(req: Request, res: Response) {
    const newBook = new bookSchema({
      title: req.body.title,
      author: req.body.author,
      isbn: req.body.isbn,
      publisher: req.body.publisher,
      yearOfPublisher: req.body.yearOfPublisher,
    });
    const newPublisher = new publisherSchema({
      publisherName: req.body.publisher,
      books: newBook,
    });
    await newBook.save();
    await newPublisher.save();

    return res.send(newBook);
  }

  public async delete(req: Request, res: Response) {
    const book = await bookSchema.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    } else {
      return res.status(200).json({ message: "Book deleted." });
    }
  }

  public async put(req: Request, res: Response) {
    const currentBook = await bookSchema.findById(req.params.id);

    if (!currentBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    currentBook.title = req.body.title;
    currentBook.author = req.body.author;
    currentBook.isbn = req.body.isbn;
    currentBook.publisher = req.body.publisher;
    currentBook.yearOfPublisher = req.body.yearOfPublisher;

    await currentBook.save();

    return res.status(200).json({ message: "Book updated." });
  }
}
