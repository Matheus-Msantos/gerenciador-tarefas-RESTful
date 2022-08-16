const express = require('express');
const bodyRarser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;


app.listen(port, () => console.log(`Servido online in port: ${port}`));
