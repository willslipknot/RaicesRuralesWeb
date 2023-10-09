import app from './app.js';

app.listen(3000)
console.log('Server on port', 3000)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
