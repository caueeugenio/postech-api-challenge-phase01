import { Request, Response } from "express";
import publisherSchema from "../schemas/publisher.schema";

export default class PublisherController {
  public async get(req: Request, res: Response) {
    const publishers = await publisherSchema.find();
    res.send(publishers);
  }

  public async getById(req: Request, res: Response) {
    const currentPublisher = await publisherSchema.findById(req.params.id);
    if (!currentPublisher) {
      return res.status(404).json({ message: "Publisher not found." });
    }
    return res.send(currentPublisher);
  }

  public async post(req: Request, res: Response) {
    const newPublisher = new publisherSchema({
      publisherName: req.body.publisherName,
      books: req.body.books || null,
    });
    await newPublisher.save();
    res.send(newPublisher);
  }

  public async delete(req: Request, res: Response) {
    const book = await publisherSchema.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Publisher not found." });
    } else {
      return res.status(200).json({ message: "Publisher deleted." });
    }
  }

  public async put(req: Request, res: Response) {
    const currentPublisher = await publisherSchema.findById(req.params.id);

    if (!currentPublisher) {
      return res.status(404).json({ message: "Publisher not found." });
    }

    currentPublisher.publisherName = req.body.publisherName;
    currentPublisher.books = req.body.books;

    await currentPublisher.save();

    return res.status(200).json({ message: "Publisher updated." });
  }
}
