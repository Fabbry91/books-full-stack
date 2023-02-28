const { Router } = require('express');

//declaro router extraido de la lib express
const router = Router();

const {
    creaAutor,
    getAutores,
    getAutorById,
    updateAutorById,
    deleteAutor
} = require('../controllers/autor');


// obtengo metodos para aplicar a los controladores 
router.post('/', creaAutor);
router.get('/',getAutores);
router.get('/:id',getAutorById);
router.put('/:id',updateAutorById);
router.delete('/:id',deleteAutor);

module.exports = router;