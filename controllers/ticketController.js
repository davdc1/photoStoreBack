const ticketModel = require('../models/Tickets');

exports.getTickets = async function(req, res){
    try{
        let tickets = await ticketModel.find();
        res.status(200).send(tickets)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getTicket = async function(req, res){
    try{
        let ticket = await ticketModel.findOne({_id: req.params.id});
        res.status(200).send(ticket);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postTicket = async function(req, res){
    try{
        const ticketItem = new ticketModel(req.body);
        ticketItem.save().then(() => res.send(ticketItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putTicket = async function(req, res){
    try{
        let updateTicket = await ticketModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateTicket)
    } catch(err){
        res.status(500).send(err);
    }
}

exports.deleteTicket = async function(req, res){
    try{
        await ticketModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}