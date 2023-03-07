const { Router } = require("express");
//declaro router extraido de la lib express
const router = Router();

const {
    getLibroById,
    getLibros,
    postLibro,
    putLibro,
    deleteLibro,
    pagination
} = require('../controllers/libroControllers');

// obtengo metodos para aplicar a los controladores 
router.get("/", getLibros);
router.get("/:id", getLibroById);
router.post("/",postLibro);
router.put("/:id",putLibro);
router.delete("/:id",deleteLibro);

router.post("/pagination",pagination);

module.exports = router;