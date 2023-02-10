import express from 'express';
import {errorHandler, routeNotFound} from '../src/middlewares'
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routeNotFound)
app.use(errorHandler)
export default app;