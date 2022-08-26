const { uuid } = require('uuidv4');

let tarefas = [
  { id: '1', nome: 'Aprender React', concluida: true },
  { id: '2', nome: 'Aprender Javascript', concluida: false },
  { id: '3', nome: 'Aprender padrões de projetos', concluida: false },
  { id: '4', nome: 'Aprender React usando hooks', concluida: false },
];

function naoImplementado(req, res) {
  res.status(501).json({
    erro: "Não implementado."
  });
}


function listarTarefaId(req, res) {
  const id = req.params.id;
  const tarefa = tarefas.filter(tarefa => tarefa.id === id);

  if (tarefa.length === 0)
    res.status(404).json({ erro: "Tarefa não encontrada." });

  res.json(tarefa[0]);
}

module.exports = {
  listarTarefaId,
  naoImplementado
}
