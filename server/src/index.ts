import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors-options';
import { authRoute } from './features/auth/routes/authRoute';
import { verifyJWT } from './middleware/verifyJWT';
import { usersRoute } from './features/users/routes/usersRoute';
import { credentials } from './middleware/credentials';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRoute);

app.use(verifyJWT);
app.use('/users', usersRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
