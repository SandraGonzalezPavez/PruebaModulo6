const express = require('express');
const fs = require('fs/promises');
const app = express();



const PORT = 3000;

app.get('/', async(req,res) => {
try {
    const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
    res.status(200).json(animeBase);
    console.log('anime :', animeBase);
} catch (error) {
    res.status(500).send(error.message);
}
res.end;
});
app.get('/crear', async(req,res) => {
    const id = uuidv4().slice(0,6);
    try {
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const ano = req.query.ano;
        const autor = req.query.autor;
        const ani= {
            nombre,
            genero,
            ano,
            autor
        }
        const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        res.status(200).json(animeBase);
        console.log('anime :', ani);
    } catch (error) {
        res.status(500).send(error.message);
    }
    res.end;
    })



app.listen(PORT, () => console.log(`Iniciando en puerto ${PORT}`));