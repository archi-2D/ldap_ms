import express from 'express';
import bodyParser from "body-parser";
import authentication from "./controllers/ldapController.js"

const app = express();
const port = 9000;

app.use(bodyParser.json());
app.post('/ldap/findUser', (req, res) => {
    authentication.findUser(req, res);
});

app.post('/ldap/createUser', (req, res) => {
    authentication.createUser(req, res);
});

/*
app.post('/ldap/modifyUser', (req, res) => {
    authentication.modifyUser(req, res);
});

app.post('/ldap/deleteUser', (req, res) => {
    authentication.deleteUser(req, res);
});*/

app.get('/ldap', (req, res) => {
    res.send(`El servidor está activo`)
});

app.listen(port, () => {
    console.log(`El servidor está inicializado en el puerto ${port}`)
});