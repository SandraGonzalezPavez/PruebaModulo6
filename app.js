const express = require('express');
const { writeFile } = require('fs');
const fs = require('fs/promises');
const app = express();

app.use(express.static(__dirname + "./public/index.html"));

app.set('PORT', 3000);
app.set('view', __dirname + './src/view');
app.get('/', async (req, res) => {
    try {
        const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        res.status(200).json(animeBase);
        console.log('anime :', animeBase);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.end;
});

app.get('/crear', async (req, res) => {
    try {

        nombre = req.query.nombre;
        genero = req.query.genero;
        ano = req.query.ano;
        autor = req.query.autor;
        const anime = {
            nombre,
            genero,
            año,
            autor
        };
        const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const id = new String(Number(Object.keys(animeBase)[Object.keys(animeBase).length - 1]) + 1);
        animeBase[id] = anime;
        
        
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeBase));

        res.status(200).json(animeBase);
        console.log('anime :', animeBase);
    } catch (error) {
        res.status(500).send(error.message);
    };
    res.end();
});
app.get("/leer/:id", async(req,res) => {
    try {
        id = req.params.id;
        animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const anime = animeBase[id];
        if(anime){
            res.status(201).json(anime);
        }
    }catch(error) {
        res.status(500).send(error.message);
    };
    
res.end();
});
app.patch('/actualizar/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
      const anime = animeBase.find(anime => anime.id === id);
      if (anime) {
        Object.assign(anime, req.body);
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeBase));
        res.status(201).json(anime);
      } else {
        res.status(404).json({
          status: 'OK',
          message: 'No existe anime a actualizar'
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    };
    
  });




module.exports = app;