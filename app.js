const express = require('express');
const { writeFile } = require('fs');
const fs = require('fs/promises');
const app = express();

app.use(express.static("./public"));
app.set('PORT', 3000);

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
        año = req.query.año;
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

app.get("/leer/:id", async (req, res) => {
    try {
        id = req.params.id;
        animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        const anime = animeBase[id];
        if (anime) {
            res.status(201).json(anime);
        }
    } catch (error) {
        res.status(500).send(error.message);
    };

    res.end();
});

app.get('/actualizar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const nombre = req.query.nombre;
        const genero = req.query.genero;
        const año = req.query.año;
        const autor = req.query.autor;
        let encontrado = false;
        const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        let anime = animeBase[id];
        if (anime) {
            anime.nombre = nombre;
            anime.genero = genero;
            anime.año = año;
            anime.autor = autor;
            encontrado = true;
        }
        if (encontrado) {
            await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeBase));
            res.status(201).json(animeBase);
        } else {
            res.status(404).json({
                status: 'OK',
                message: 'No existe animé a actualizar'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
    res.end();
});

app.get('/borrar/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const animeBase = JSON.parse(await fs.readFile(__dirname + '/anime.json'));
        delete animeBase[id];
        await fs.writeFile(__dirname + '/anime.json', JSON.stringify(animeBase));
        res.status(201).json(animeBase);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
    res.end();
});



module.exports = app;
