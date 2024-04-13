import mongoose, { Schema } from "mongoose";

export interface IPublisherInterface {
  id: mongoose.Types.ObjectId;
  publisherName: String;
  books: String;
}

export const publisher: Schema = new Schema<IPublisherInterface>(
  {
    publisherName: { type: String, required: true },
    books: { type: Array<String>, required: false, default: null },
  },
  { versionKey: false }
);

publisher.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

export default mongoose.model<IPublisherInterface>("Publisher", publisher);
