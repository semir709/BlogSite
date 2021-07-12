let express = require('express');
let bodyParser = require('body-parser');

app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.use('/', require('./routes/routes'));


app.listen(3000);