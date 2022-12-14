const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const {
  listarTarefaId,
  listarTarefas,
  naoImplementado,
  cadastrarTarefa,
  atualizarTarefa,
  removerTarefa,
  concluirTarefa
} = require('./controllers/gerenciador-tarefas.js');

const app = express();
const port = 3001;

//Midleware
app.use(cors());
app.use(bodyParser.json());

//Requisições (get, post, put, delete)
//Listar todas as tarefas
app.get('/gerenciador-tarefas', listarTarefas);
//Listar tarefa por ID
app.get('/gerenciador-tarefas/:id', listarTarefaId);
//Cadastrar uma tarefa
app.post('/gerenciador-tarefas', cadastrarTarefa);
//Atualizar uma tarefa
app.put('/gerenciador-tarefas/:id', atualizarTarefa);
//Excluir uma tarefa
app.delete('/gerenciador-tarefas/:id', removerTarefa);
//Concluir uma tarefa
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa);



app.listen(port, () => console.log(`Servido online in port: ${port}`));
