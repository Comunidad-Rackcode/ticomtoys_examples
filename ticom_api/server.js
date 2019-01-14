// Importaciones de Node
var express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');

// Importaciones del proyecto
const db = require('./app/config/db.config.js');

// Inicializo express
var app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Manejo de Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// Usamos morgan para el log 
// Creamos el flujo de escritura (en modo de agregación)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('dev', { stream: accessLogStream }));

// Configuración de respuestas tipo json
app.use(express.json());

// Usamos la librería fileUpload
app.use(fileUpload());

// Hacemos la importación de las rutas
var auth_route = require('./app/routes/auth.route')(app);
var test_route = require('./app/routes/test.route')(app);
var providers_route = require('./app/routes/providers.route')(app);
//var products_route = require('./app/routes/products.route')(app);
var containers_route = require('./app/routes/containers.route')(app);

// Usamos las rutas y le agregamos la versión con la que estamos
// trabajando
app.use("/api/v1", auth_route);
app.use("/api/v1", test_route);
app.use("/api/v1", providers_route);
//app.use("/api/v1", products_route);
app.use("/api/v1", containers_route);

// Inicializamos nuestra base de datos
db.sequelize.sync({ force: true }).then(() => {
    console.log('Borra y sincroniza obligatoriamente los modelos con { force: true }');
    // Crea los registros con los que se debe inicializar la base de datos
    db.role_seeder.initial();
});

// Creamos e inicializamos el servidor
var server = app.listen(app.get('port'), () => {

    var host = server.address().address
    var port = server.address().port

    console.log("La app esta corriendo por http://%s:%s", host, port)
});