const express = require('express');
const app = express();
const ticketRoutes = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

var upload = multer({ dest: './uploads/'});
const Ticket = require('../models/Ticket');

AWS.config.update({
    accessKeyId: "",
    secretAccessKey: ""
  });

var s3 = new AWS.S3();


ticketRoutes.route('/add').post(function (req, res) {
   var ticket = new Ticket(req.body);
       ticket.save()
     .then(ticket => {
       console.log("hello", req.body);
       res.status(200).json({'ticket': 'ticket added successfully'});
     })
     .catch(err => {
       res.status(400).send("unable to save to database");
     });
 });

 ticketRoutes.route('/file').post(upload.single('file'),function (req,res) {
   let filePath = req.file.path;
   //configuring parameters
   var params = {
     Bucket: 'vuexproject-peterpan-test',
     Body : fs.createReadStream(filePath),
     Key : "folder/"+Date.now()+"_"+path.basename(filePath)
   };

   s3.upload(params, function (err, data) {
     //handle error
     if (err) {
       console.log("Error", err);
     }
     //success
     if (data) {
       console.log("datatest",data);
       res.json(data);
     }
   });
 })


 ticketRoutes.route('/').get(function (req, res) {
   Ticket.find(function (err, tickets){
     if(err){
       console.log(err);
     }
     else {
       res.json(tickets);
     }
   });
 });




 module.exports = ticketRoutes;
