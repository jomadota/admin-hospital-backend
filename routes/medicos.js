/*
    Medicos
    ruta: "/api/medicos"
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require("../controllers/medicos")

const router = Router();

//Obtener lista de medicos
router.get('/', validarJWT, getMedicos);

//Crear Medico
router.post('/', [
        validarJWT,
        check("nombre", "El nombre del medico es necesario").not().isEmpty(),
        check("hospital", "El hospital id debe ser valido").isMongoId(),
        validarCampos
    ],
    crearMedico
);

//Actualizar medico
router.put('/:id', [
        validarJWT,
        check("nombre", "El nombre del medico es necesario").not().isEmpty(),
        check("hospital", "El hospital id debe ser valido").isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

//Borrar medico
router.delete('/:id',
    validarJWT,
    borrarMedico
);


router.get('/:id',
    validarJWT,
    getMedicoById
);



module.exports = router;