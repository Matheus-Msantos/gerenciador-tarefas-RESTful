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

function listarTarefas(req, res) {
  const pagina = req.query['pag'] || 1;
  const ordem = req.query['ordem'];
  const filtroTarefa = req.query['filtro-tarefa'];
  const itensPorPagina = req.query['itens-por-pagina'] || 3;
  let tarefaRetornar = tarefas.slice(0);
  //Filtrar
  if (filtroTarefa)
    tarefaRetornar = tarefaRetornar.filter(t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0);
  //Ordernar
  if (ordem === 'ASC')
    tarefaRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
  else if (ordem === 'DESC')
    tarefaRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
  //Retornar
  res.json({
    totalItens: tarefaRetornar.length,
    tarefas: tarefaRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina),
    pagina: pagina
  })
}

function cadastrarTarefa(req, res) {
  if (!req.body['nome'] && !req.body['concluida'])
    res.status(400).json({ erro: 'Requisição inválida.' });

  const novaTarefa = {
    'id': uuid(),
    'nome': req.body['nome'],
    'concluida': req.body['concluida']
  };

  tarefas.push(novaTarefa);
  res.json(tarefas);
}

module.exports = {
  listarTarefaId,
  listarTarefas,
  naoImplementado,
  cadastrarTarefa
}
