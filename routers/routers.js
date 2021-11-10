const { Router } = require("express");
const router = Router();
const  { connection }  = require('../database/config');

//Listar todos
router.get("/api/bodega/listar", (req, res) => {
    const query = 'SELECT * FROM bodega';
    try {
        connection.query(query, (error, result) => {
            console.log("resultado", result);

            if (error) throw error;

            if (result.length > 0) {
                res.json(result);
            } else {
                console.log("Sin resultado")
            }
        });
    } catch (error) {
        return console.log("Sin resultado", error)
    }

});

//Guardar 
router.post('/api/bodega/guardar', (req, res) => {
    const sql = 'INSERT INTO bodega SET ?';
    try {
        const customerObj = {
            id_empresa : req.body.id_empresa,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            id_user: req.body.id_user,
            codigo: req.body.codigo
        };
    
        connection.query(sql, customerObj, error => {
            if (error) throw error;
            res.send('Customer created!');
        });
    } catch (error) {
        return console.log("Sin resultado", error)
    }
});

//Actualizar
router.put('/api/bodega/actualizar:id', (req, res) => {
    const { id } = req.params;
    const { id_empresa, nombre, descripcion, id_user, codigo } = req.body;

    const sql = `UPDATE bodega SET  id_empresa = '${id_empresa}', nombre = '${nombre}', descripcion='${descripcion}', id_user = '${id_user}, codigo = '${codigo}' WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Customer updated!');
    });
});


//Login
router.get("/api/login", (req, res) => {
   
    const { user, pass} = req.body;
    const query = `SELECT * FROM usuario WHERE user = '${user}' AND pass = '${pass}'`;

    try {
        connection.query(query, (error, result) => {

            if (error) throw error;

            if (result.length > 0) {

                
                const querycall = `call cargar_menu(${result[0].id})`;

                try {
                    connection.query(querycall, (error, result) => {
                        console.log(result) // count of recordsets returned by the procedure
             
                    });

                } catch (error) {
                    return console.log("Sin resultado", error)
                }

                res.json(result);
            } else {
                console.log("Sin resultado")
            }
        });
    } catch (error) {
        return console.log("Sin resultado", error)
    }

});



router.put("/api/products/:product_id", async (req, res) => {
    try {
        const document = db.collection("products").doc(req.params.product_id);
        await document.update({
            name: req.body.name,
        });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).json();
    }
});

router.delete("/api/products/:product_id", async (req, res) => {
    try {
        const doc = db.collection("products").doc(req.params.product_id);
        await doc.delete();
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
