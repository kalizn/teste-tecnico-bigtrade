import mongoose, { Document, Model } from 'mongoose';

const username = process.env.MONGO_USERNAME || 'root';
const password = process.env.MONGO_PASSWORD || 'example';
const hostname = process.env.MONGO_HOSTNAME || 'localhost';
const port = process.env.MONGO_PORT || '27017';
const database = process.env.MONGO_DB || 'mydatabase';

const connectionString = `mongodb://${username}:${password}@${hostname}:${port}/${database}`;

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  published: string;
  updated: string;
}

// Definindo o esquema usando Mongoose
const postSchema = new mongoose.Schema<Post>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Number, required: true },
  published: { type: String, required: true },
  updated: { type: String, required: true },
});

// Criando o modelo usando Mongoose
const PostModel = mongoose.model<Post>('Post', postSchema);

export class PostService {
  async createPost(post: Post): Promise<boolean> {
    try {
      await mongoose.connect(connectionString);
      const result = await PostModel.create(post);
      return result._id !== null;
    } finally {
      await mongoose.connection.close();
    }
  }

  async getPosts(): Promise<Post[]> {
    try {
      await mongoose.connect(connectionString);
      const posts = await PostModel.find().exec();
      return posts;
    } finally {
      await mongoose.connection.close();
    }
  }

  async getPostById(id: number): Promise<Post | null> {
    try {
      await mongoose.connect(connectionString);
      const post = await PostModel.findById(id).exec();
      return post ? post.toObject() : null;
    } finally {
      await mongoose.connection.close();
    }
  }

  async updatePost(id: number, updatedPost: Partial<Post>): Promise<boolean> {
    try {
      await mongoose.connect(connectionString);
      const result = await PostModel.updateOne({ _id: id }, { $set: updatedPost }).exec();
      return result.modifiedCount === 1;
    } finally {
      await mongoose.connection.close();
    }
  }

  async deletePost(id: number): Promise<boolean> {
    try {
      await mongoose.connect(connectionString);
      const result = await PostModel.deleteOne({ _id: id }).exec();
      return result.deletedCount === 1;
    } finally {
      await mongoose.connection.close();
    }
  }
}
