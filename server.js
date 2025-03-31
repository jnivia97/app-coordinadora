import express from 'express';
import app from './src/app.js';
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${PORT}`)
})