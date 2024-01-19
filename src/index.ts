import * as express from 'express';
import { createUser, updateUser, getUser, deleteUser } from './controllers/users.controllers';
import { createPost, getPosts, getPostById, updatePost, deletePost} from 'controllers/posts.controllers';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// ** Rotas para User
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.get('/users/:id', getUser);
app.delete('/users/:id', deleteUser);

app.post('/posts', createPost);
app.get('/posts', getPosts);
app.get('/posts/:id', getPostById);
app.put('/posts', updatePost);
app.delete('/posts/:id', deletePost);

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
