const ticketModel = require('../models/Tickets');

exports.getTickets = async function(req, res, next){
    try{
        console.log("get tickets");
        let tickets = await ticketModel.find();
        console.log("i'm here");
        res.status(200).send(tickets)
    } catch(err){
        res.status(500).send(err)
    }
}

exports.getTicket = async function(req, res, next){
    try{
        console.log("get ticket by id");
        let ticket = await ticketModel.findOne({_id: req.params.id});
        console.log("requsted ticket:", ticket);
        res.status(200).send(ticket);
    } catch(err){
        res.status(500).send(err);
    }
}

exports.postTicket = async function(req, res, next){
    try{
        console.log("post ticket");
        const ticketItem = new ticketModel(req.body);
        ticketItem.save().then(() => res.send(ticketItem))
    } catch(err){
        res.status(500).send(err);
    }
}

exports.putTicket = async function(req, res, next){
    try{
        console.log("put ticket", req.params.id);
        let updateTicket = await ticketModel.findOneAndUpdate({_id: req.params.id}, {$set: req.body })
        res.status(200).send(updateTicket)
    } catch(err){
        console.log("put err:", err);
        res.status(500).send(err);
    }
}

exports.deleteTicket = async function(req, res, next){
    try{
        console.log("delete ticket");
        await ticketModel.findOneAndDelete({_id: req.params.id});
        res.status(200).send({});
    } catch(err){
        res.status(500).send(err);
    }
}