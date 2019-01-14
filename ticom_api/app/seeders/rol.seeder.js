// -> Función para crear los roles estaticos que debe tener la base de datos
module.exports = (Role) => {

    initial = () => {
        Role.create({
            id: 1,
            name: "USER"
        });

        Role.create({
            id: 2,
            name: "SELLER"
        });

        Role.create({
            id: 3,
            name: "ADMIN"
        });
    }

    // -> Exporta las funciones permitidas para su uso
    return {
        initial
    };
}