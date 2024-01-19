import { Model, Document, Schema, connect, model } from 'mongoose';

const username = process.env.MONGO_USERNAME || 'root';
const password = process.env.MONGO_PASSWORD || 'example';
const hostname = process.env.MONGO_HOSTNAME || 'localhost';
const port = process.env.MONGO_PORT || '27017';
const database = process.env.MONGO_DB || 'mydatabase';

const connectionString = `mongodb://${username}:${password}@${hostname}:${port}/${database}`;

interface User {
  id: number;
  displayName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  id: { type: Number, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = model<User>('User', userSchema);

export class UserService {
  constructor() {
    connectToDatabase();
  }

  async createUser(user: User) {
    try {
      const existingUser = await UserModel.findOne({ email: user.email });
      if (existingUser) {
        return { status: false, message: 'Email já cadastrado' };
      }

      const newUser = await UserModel.create(user);
      return { status: true, message: 'Usuário criado com sucesso', userId: newUser.id };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return { status: false, message: 'Erro ao criar usuário' };
    }
  }

  async updateUser(userId: string, updatedUser: Partial<User>) {
    try {
      const result = await UserModel.updateOne({ _id: userId }, { $set: updatedUser });
  
      if (result.modifiedCount === 0) {
        return { status: false, message: 'Usuário não encontrado' };
      }
  
      return { status: true, message: 'Usuário atualizado com sucesso' };
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return { status: false, message: 'Erro ao atualizar usuário' };
    }
  }
  

  async getUser(userId: string) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        return { status: false, message: 'Usuário não encontrado' };
      }

      return { status: true, user };
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return { status: false, message: 'Erro ao buscar usuário' };
    }
  }

  async getAllUsers() {
    try {
      const users = await UserModel.find({});
      return { status: true, users };
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      return { status: false, message: 'Erro ao buscar todos os usuários' };
    }
  }

  async deleteUser(userId: string) {
    try {
      const result = await UserModel.deleteOne({ _id: userId });

      if (result.deletedCount === 0) {
        return { status: false, message: 'Usuário não encontrado' };
      }

      return { status: true, message: 'Usuário removido com sucesso' };
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      return { status: false, message: 'Erro ao excluir usuário' };
    }
  }
}

async function connectToDatabase() {
  try {
    await connect(connectionString);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}
