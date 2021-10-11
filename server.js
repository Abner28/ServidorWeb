const path = require('path')

const express = require('express')

const projet = require('./back/jouer.js');

const app = express()
const db = require("./db")

const cookieParser = require('cookie-parser')

const hostname = '127.0.0.1';
const port = 3000;


// app.use(function (req, res, next) {
//     date = new Date(Date.now())
//     console.log('Time:', date.toLocaleDateString(), date.toLocaleTimeString(), "; url :", req.url);
//     next(); // sans cette ligne on ne pourra pas poursuivre.
// })

app.use(cookieParser())
app.use(express.json())

app.use("/static", express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
    res.redirect(301, '/static/index.html')
})


app.get(encodeURI('/lancers'), (req, res) => {

    let results = projet.jouerLeDe();
    [d1,d2,d3,d4,d5] =  results[0];
    somme = results[1];

    res.json({
        d1: d1,
        d2: d2,
        d3: d3,
        d4: d4,
        d5: d5,
        somme: somme,
    })
})
app.post("/api/create/", (req, res) => {

    db.models.Score.create({
        pseudo: req.body.pseudo,
        score: req.body.score
    }).then((score) => {
        res.json(score)
    }).catch((err) => {
        console.log(err)
    })
})

app.get("/cookie/", (req, res) => {
    console.log(req.query)
    for (const property in req.query) {
        // console.log(`${property}: ${req.query[property]}`);

        res.cookie(property, req.query[property])
        res.end("cookie updated")   
      }
})

app.get("/api/read/", (req, res) => {
    if ("pseudo" in req.query) {
        db.models.Score.findAll({
            "where": {
                "pseudo": req.query.pseudo
            }
        }).then((score) => {
            res.json(score)
        }).catch((err) => {
            res.end("error")
            console.log(err)
        })
    
    } else {
        db.models.Score.findAll({
        }).then((score) => {
            res.json(score)
        }).catch((err) => {
            res.end("error")
            console.log(err)
        })    
    }
})

app.use(function (req, res) {
    console.log("et c'est le 404 : " + req.url);

    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    res.end("<html><head><title>la quatre cent quatre</title></head><body><h1>Et c'est la 404.</h1><img  src=\"https://www.leblogauto.com/wp-content/uploads/2020/04/Peugeot-404-1.jpg\" /></body></html>");

})

app.listen(port, hostname);
console.log(`Server running at http://${hostname}:${port}/`);