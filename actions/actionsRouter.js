// const express = require('express');
// const Actions = require('../data/helpers/actionModel');

// const router = express.Router();

// router.get('/', (req, res) => {
//     console.log(req.query)
//     Actions.get(req.query)
//         .then(posts => {
//             res.status(200).json(posts);
//         })
//         .catch(error => {
//             res.status(500).json({ err: "The projects can not be retrived" })
//         })
// });

// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//         .then(actions => {
//             res.status(201).json(actions);
//         })
//         .catch(error => {
//             res.status(400).json({
//                 errorMessage: "Use correct data",
//             });
//         });
// });

// module.exports = router;