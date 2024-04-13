import mongoose, { mongo, Schema } from "mongoose";

export interface IBookInterface {
  _id: mongoose.Types.ObjectId;
  title: String;
  author: String;
  isbn: String;
  publisher: String;
  yearOfPublisher: Number;
}

export const book: Schema = new Schema<IBookInterface>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      alias: "id",
    },
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    publisher: { type: String, required: true },
    yearOfPublisher: { type: Number, required: true },
  },
  { versionKey: false }
);

book.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model<IBookInterface>("Book", book);
