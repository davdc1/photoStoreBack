require('../data/database');
const express = require('express');
const router = express.Router();
const ticketModel = require('../models/Tickets');
const ticketCont = require('../controllers/ticketController');


router.get('/', ticketCont.getTickets);
router.get('/:id', ticketCont.getTicket);
router.post('/', ticketCont.postTicket);
router.put('/:id', ticketCont.putTicket);
router.delete('/:id', ticketCont.deleteTicket);

module.exports = router;