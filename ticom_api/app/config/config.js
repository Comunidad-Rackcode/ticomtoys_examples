module.exports = {
    // clave secreta para codificar y decodificar los tokens
    'secret': '~-kz`<7P<4{](8o',

    // clave secreta para codificar y decodificar los refresh tokens
    "refreshTokenSecret": 'jTTq^(@D{Al~1:T',

    // tiempo de vida de los tokens
    "tokenLife": 3600, //3600 segundos - 1 hora

    // tiempo de vida de los refresh tokens
    "refreshTokenLife": 172800, //172800 segundos - 48 horas

    // Roles permitidos dentro de la app
    ROLEs: ['USER', 'ADMIN', 'SELLER'],
};