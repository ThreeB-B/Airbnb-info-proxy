const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
var cors = require('cors')
app.use(cors())

app.use(express.static(__dirname + '/../public'));

const roomInfo = 'http://airbb3-info1-1972256759.us-west-1.elb.amazonaws.com';
const roomBooking = 'http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com';
const roomReviews = 'http://3bb-reviews-classic-1100595086.us-west-2.elb.amazonaws.com';

let roomId = 0;

  app.get('/listings/:id', (req, res) => {
    const { id } = req.params;
    roomId = id;
    axios.get(`${roomInfo}/listings/${roomId}`)
      .then(({ data }) => {res.send(data)});
  });
  app.get('/room/', (req, res) => {
    axios.get(`${roomBooking}/room?id=${roomId}`)
      .then(({ data }) => {res.send(data)});
  });
  app.get('/booking/', (req, res) => {
    axios.get(roomBooking + `/booking?id=${roomId}`)
      .then(({ data }) => {res.send(data)});
  });
  app.get('/rooms/:id/bundle.js', (req, res) => {
    axios.get(`${roomReviews}/rooms/${roomId}/bundle.js`)
      .then(({ data }) => {res.send(data)});
  });
   app.get('/reviews/', (req, res) => {
    const { id } = req.params;
    axios.get(`${roomReviews}/reviews/${roomId}`)
      .then(({ data }) => {res.send(data)});
  });

app.listen(3010, function() {
    console.log('listening on port 3010!');
});