import express, { Express, Request, Response } from "express";
import mongoose, { model, Schema } from "mongoose";

const app: Express = express();
app.use(express.json());
const port = 3000;

interface BookInterface {
  title: String;
  author: String;
  isbn: String;
  publisher: String;
  yearOfPublisher: Number;
}
interface PublisherInterface {
  publisherName;
  books: String;
}

const bookSchema = new Schema<BookInterface>({
  title: String,
  author: String,
  isbn: String,
  publisher: String,
  yearOfPublisher: Number,
});

const publisherSchema = new Schema<PublisherInterface>({
  publisherName: String,
  books: bookSchema,
});

const book = model<BookInterface>("Book", bookSchema);
const publisher = model<PublisherInterface>("Publisher", publisherSchema);

app.get("/", async (req: Request,res: Response) => {
  const books = await book.find();
  return res.send(books);
});

app.get("/publishers", async (req: Request,res: Response) => {
  const publishers = await publisher.find();
  res.send(publishers);
});
app.get("/publisher:name", async (req: Request,res: Response) => {
  const publishers = await publisher.findById(req.params.name);
  res.send(publishers);
});



app.post("/", async (req: Request, res: Response) => {
  const newBook = new book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    publisher: req.body.publisher,
    yearOfPublisher: req.body.yearOfPublisher,
  });

  const newPublisher = new publisher({
    publisherName: req.body.publisher,
    books: newBook
  });

  await newBook.save();
  await newPublisher.save();
  return res.send(newBook);
});

// app.post("/publisher", async (req: Request, res: Response) => {
  
//   await newPublisher.save();
//   res.send(newPublisher);
// });

app.listen(port, () => {
  mongoose
    .connect(
      "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    )
    .then(() => {
      console.log("conectado");
    });
  console.log(`Running server api on port ${port}.`);
});
