const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ["hospitales", "medicos", "usuarios"];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es untipo valido"
        })

    }

    //alidar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se cargo el archivo "
        })
    }

    //procesar la imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar la extension del archivo
    const extensionesValidas = ["png", "jpg", "jepg", "gif"];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: "No es una extension valida"
        })
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Crear el path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`

    //Mover el archivo a la carpeta correspondiente
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: "Error al mover la imagen"
            });
        }
    })

    //Actualizar a base de datos
    actualizarImagen(tipo, id, nombreArchivo);



    res.json({
        ok: true,
        nombreArchivo,
        path,
        id
    });

}



const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${ tipo }/${ foto }`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);

    } else {
        const pathImg = path.join(__dirname, `../uploads/no_imagen.png`);
        res.sendFile(pathImg);
    }




}







module.exports = {
    fileUpload,
    retornaImagen
}