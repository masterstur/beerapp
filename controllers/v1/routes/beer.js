const router = require('express').Router();
const db = require('../../../models')

router.get('/', async (req, res) => {

    try {

        const beer = await db.beer.findAll();
        return res.status(200).json({beer: beer});

    } catch (e) {

        return res.status(500).send(`unexpected error: ${e}`)

    }
     
});

router.get('/:id', async (req, res) => {

    try {

        const beer = await db.beer.findById(req.params.id)
        return res.status(200).json({ beer: beer });

    } catch (e) {

        return res.status(401).send(`failed to find beer: ${e}`);

    }

});

router.post('/', async (req, res) => {

    if (req.body.id) {
        delete req.body.id;
    }

    const args = JSON.parse(JSON.stringify(req.body));

    try {

        const newBeer = await db.beer.create(args);
        return res.status(200).json({ beer: newBeer });

    } catch (e) {

        return res.status(401).send(`failed to create beer: ${e}`);

    }
    
});

router.put('/:id', async (req, res) => {

   const args = JSON.parse(JSON.stringify(req.body));

   try {

       const beer = await db.beer.update(args, {
           where: {
               id: req.params.id
           },
           returning: true
       });
       return res.status(200).json({ beer: beer });

   } catch (e) {

       console.log(e);
       return res.status(401).send(`failed to update for id ${req.params.id}`);

   }

});

module.exports = router;