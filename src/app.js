
import fetch from 'node-fetch';
import express from 'express';
import bodyParser from 'body-parser'
import { dirname } from 'path';
import { fileURLToPath } from 'url';



const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded());

//Arquivos estáticos
app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));

app.set('views', './views')
app.set('view engine', 'ejs')


app.post('/', (req, res)=>{
  res.redirect(req.body.conteudo)
})



app.get('/', function(req, res){

  fetch(`https://api.jikan.moe/v4/anime/${req.params.uid}`)
  .then(resposta => resposta.json())
  .then(json => {
    var array = Object.keys(json)
    .map(function(key) {
        return json[key];
    });
    res.render('index', 
    {
    title:array[0].title,
    episodes:array[0].episodes,
    status:array[0].status,
    rating:array[0].rating,
    score:array[0].score,
    rank:array[0].rank,
    popularity:array[0].popularity,
    synopsis:array[0].synopsis})
})
})
app.get('/:uid', async function(req, res){

  fetch(`https://api.jikan.moe/v4/anime/${req.params.uid}`)
  .then(resposta => resposta.json())
  .then(json => {
    var array = Object.keys(json)
    .map(function(key) {
        return json[key];
    });
    res.render('index', 
    {
    title:array[0].title,
    episodes:array[0].episodes,
    status:array[0].status,
    rating:array[0].rating,
    score:array[0].score,
    rank:array[0].rank,
    popularity:array[0].popularity,
    synopsis:array[0].synopsis})
})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})
