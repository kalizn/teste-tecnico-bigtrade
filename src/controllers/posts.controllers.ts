import { Request, Response } from 'express';
import { PostService } from '../services/posts.service';

const postService = new PostService();

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  published: string;
  updated: string;
}

export const createPost = async (req: Request, res: Response) => {
  const postData = req.body;

  const result: { status: boolean; message?: string; } = { status: false };

  const postReceived = await postService.createPost(postData);

  if (postReceived) {
    result.status = true;
    result.message = 'Post criado com sucesso';
    res.status(201).json(result);
  } else {
    result.message = 'Erro ao criar post';
    res.status(400).json(result);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const updatedPostData = req.body;

  const result: { status: boolean; message?: string } = { status: false };

  if (await postService.updatePost(postId, updatedPostData)) {
    result.status = true;
    result.message = 'Post atualizado com sucesso';
    res.json(result);
  } else {
    result.message = 'Erro ao atualizar post';
    res.status(404).json(result);
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  const result: { status: boolean; post?: Post; message?: string } = { status: false };

  const post = await postService.getPostById(postId);

  if (post) {
    result.status = true;
    result.post = post;
    res.json(result);
  } else {

    result.message = 'Post não encontrado';
    res.status(404).json(result);
  }
};

export const getPosts = async (_req: Request, res: Response) => {
  const result: { status: boolean; posts?: Post[]; message?: string } = { status: false };

  const posts = await postService.getPosts();

  if (posts) {
    result.status = true;
    result.posts = posts;
    res.json(result);
  } else {
    result.message = 'Erro ao obter posts';
    res.status(500).json(result);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);

  const result: { status: boolean; message?: string } = { status: false };

  if (await postService.deletePost(postId)) {
    result.status = true;
    result.message = 'Post excluído com sucesso';
    res.json(result);
  } else {
    result.message = 'Erro ao excluir post';
    res.status(404).json(result);
  }
};
