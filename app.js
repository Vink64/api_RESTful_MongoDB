const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

const contatoRouter = require('./routes/contatoRoutes');
app.use('/contatos', contatoRouter);

app.use((req,res)=>{
    res.statusCode=404;
    res.send({
        error:"123",
        message:"Rota inválida"
    })
})

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB Atlas!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;