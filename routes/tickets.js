require('../data/database');
const express = require('express');
const router = express.Router();
const ticketCont = require('../controllers/ticketController');
const ticketValSchema = require('../validation/models/ticketValModel')
const valErrorHandler = require('../validation/errorHandlers/valErrorHandler');
const validator = require("express-joi-validation").createValidator({
    passError: true,
});

router.get('/', ticketCont.getTickets);
router.get('/:id', ticketCont.getTicket);
router.post('/', ticketCont.postTicket);
router.put('/:id', ticketCont.putTicket);
router.delete('/:id', ticketCont.deleteTicket);

module.exports = router;