import express from 'express';
import {errorHandler, routeNotFound} from '../src/middlewares'
import { signupRouter } from './routers/signup.router';
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/signup',signupRouter)
app.use(routeNotFound)
app.use(errorHandler)

export default app;