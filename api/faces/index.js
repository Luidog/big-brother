'use strict';

const { Router } = require('express');
const face = require('./face.controller');
const { authentication, validation, Joi } = require('../../services');
const router = Router();

router.post('/', authentication.verify(), face.train);

router.post('/', authentication.verify(), face.recognize);

module.exports = router;
