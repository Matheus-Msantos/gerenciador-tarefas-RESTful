const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

//Midleware
app.use(cors());
app.use(bodyParser.json());

//to-do Criar URLs da API
//Requisições (get, post, put, delete)



app.listen(port, () => console.log(`Servido online in port: ${port}`));
