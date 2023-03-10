import express from 'express';
import {errorHandler, routeNotFound,auth} from '../src/middlewares'
import { signupRouter,loginRouter,courseRouter,userRouter } from './routers';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/signup', signupRouter)
app.use('/login', loginRouter);
app.use('/api',auth)
app.use('/api/courses', courseRouter)
app.use('/api/users',userRouter)
app.use(routeNotFound)
app.use(errorHandler)

export default app;