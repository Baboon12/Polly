const { request } = require('express');
const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/Vote');

const pusher = new Pusher({
    appId: "1221496",
    key: "335ac32498d85fd8cc1b",
    secret: "1c5335b149f73f67cd8b",
    cluster: "ap2",
    useTLS: true
});

// Here '/' refers to '/poll' 
router.get('/', (req, res)=>{
    Vote.find().then(votes => res.json({ success: true, votes:votes }))
});

// Here '/' refers to '/poll' 
router.post('/', (req, res)=>{

    const newVote = {
        os: req.body.os, // the request.body.os refers to name="os" in form
        points: 1
    }

        new Vote(newVote).save().then(vote => {
            pusher.trigger('os-poll', 'os-vote', {
                points: parseInt(vote.points),
                os: vote.os 
            });
        
            return res.json({success: true, message: 'Thank You For Voting'});
        });
});

module.exports = router;