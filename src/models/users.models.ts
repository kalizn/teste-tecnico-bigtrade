import { Schema, model } from 'mongoose';

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

export { UserModel };
