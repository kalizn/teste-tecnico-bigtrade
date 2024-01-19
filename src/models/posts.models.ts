import { Schema, model } from 'mongoose';

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  published: string;
  updated: string;
}

const postSchema = new Schema<Post>({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Number, required: true },
  published: { type: String, required: true },
  updated: { type: String, required: true },
});

const PostModel = model<Post>('Post', postSchema);

export { PostModel };
