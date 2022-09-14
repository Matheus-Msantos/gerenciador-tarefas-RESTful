import React from 'react';
import { useRoutes } from 'hookrouter'
import './App.css';
import ListarTarefas from './Listar/Listar-tarefas.js'
import CadastrarTarefa from './Cadastrar/Cadastrar-tarefa.js'
import AtualizarTarefa from './Atualizar/Atualizar-tarefa.js'

const routes = {
  '/': () => <ListarTarefas />,
  '/cadastrar': () => <CadastrarTarefa />,
  '/atualizar/:id': ({ id }) => <AtualizarTarefa id={id} />
};

function App() {
  return useRoutes(routes);
}

export default App;
