const express = require('express');
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel');
const { route } = require('../actions/actionsRouter');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.query)
    Projects.get(req.query)
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({ err: "The projects can not be retrived" })
        })
});

router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
        .then(project => {
            if (project) {
                res.status(200).json(project);
            } else {
                res.status(404).json({
                    error: "This does not exist"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
            });
        });
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(400).json({
                errorMessage: "Use correct data",
            });
        });
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    Projects.update(req.params.id, changes)
        .then(project => {
            if (project) {
                res.status(200).json([project]);
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
    Projects.remove(req.params.id)
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


router.get('/:id/actions', async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id);
        if (actions.length > 0) {
            res.status(200).json(actions);
        } else {
            res.status(404).json({ error: "No exist" });
        }
    } catch (error) {
        res.status(500).json({
            message: "No Exist",
        });
    }
})


router.post('/:id/actions', async (req, res) => {
    const actionsData = { ...req.body, project_Id: req.params.id };

    try {
        const action = await Actions.insert(actionsData);
        res.status(201).json(action);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
})

router.delete('/:id/actions', async (req, res) => {
    const actionsData = { ...req.body, project_Id: req.params.id };

    try {
        const action = await Actions.insert(actionsData);
        res.status(201).json(action);
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
})

module.exports = router;