/*
    Hospitales
    ruta: "/api/hospitales"
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require("../controllers/hospitales")

const router = Router();

//Obtener la lista de los hospitales
router.get('/', getHospitales);

//Crear Hospital
router.post('/', [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

//Actualizar hospital
router.put('/:id', [
        validarJWT,
        check("nombre", "El nombre del hospital es necesario").not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

//Borrar hospital
router.delete('/:id',
    validarJWT,
    borrarHospital
);


module.exports = router;