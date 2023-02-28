const { Router } = require("express");
//declaro router extraido de la lib express
const router = Router();

const {
    getLibro,
    getLibros,
    postLibro,
    putLibro,
    deleteLibro,
} = require('../controllers/libroControllers');

// obtengo metodos para aplicar a los controladores 
router.get("/", getLibros);
router.get("/:id", getLibro);
router.post("/",postLibro);
router.put("/:id",putLibro);
router.delete("/:id",deleteLibro);

module.exports = router;