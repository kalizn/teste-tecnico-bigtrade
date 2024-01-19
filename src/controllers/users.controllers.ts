import { Request, Response } from 'express';
import { UserService } from '../services/users.service'

const userService = new UserService();

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const result = await userService.createUser(userData);

  if (result.status) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const updatedUserData = req.body;

  const result = await userService.updateUser(userId, updatedUserData);

  if (result.status) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const result = await userService.getUser(userId);

  if (result.status) {
    res.json(result.user);
  } else {
    res.status(404).json(result);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const result = await userService.deleteUser(userId);

  if (result.status) {
    res.json(result);
  } else {
    res.status(404).json(result);
  }
};
