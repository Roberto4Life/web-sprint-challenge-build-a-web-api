const express = require('express');
const Actions = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.id)
    Actions.get(req.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({ err: "The projects can not be retrived" })
        })
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Actions.update(req.params.id, changes)
        .then(actions => {
            if (actions) {
                res.status(200).json([actions]);
            } else {
                res.status(404).json({ message: 'This post does not exist' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error updating the post',
            });
        });
});

router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: 'The post has been nuked' });
            } else {
                res.status(404).json({ message: 'The post could not be found' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error removing the post',
            });
        });
});

module.exports = router;