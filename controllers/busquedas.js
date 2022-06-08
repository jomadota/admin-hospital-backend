//getTodo
const { response } = require("express");
const Usuario = require("../models/usuario")
const Medico = require("../models/medico")
const Hospital = require("../models/hospital")

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    //Esta busqueda hace una por una y hara que se tarde 3 veces
    // const usuarios = await Usuario.find({ nombre: regex });
    // const medicos = await Medico.find({ nombre: regex });
    // const hospitales = await Hospital.find({ nombre: regex });

    //esta busqueda lanza las 3 al mismo tiempo y hasta que termine continua, reduciendo el tiempo
    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre"),
        Hospital.find({ nombre: regex })
        .populate("usuario", "nombre img"),
    ])

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, "i");

    let data = [];

    switch (tabla) {
        case "medicos":
            data = await Medico.find({ nombre: regex })
                .populate("usuario", "nombre img")
                .populate("hospital", "nombre")

            break;

        case "hospitales":
            data = await Hospital.find({ nombre: regex })
                .populate("usuario", "nombre img")

            break;

        case "usuarios":
            data = await Usuario.find({ nombre: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: "La coleccion no se encontro"
            });

    }


    res.json({
        ok: true,
        resultados: data
    })
}



module.exports = {
    getTodo,
    getDocumentosColeccion
}