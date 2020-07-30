'use strict';

const { Router } = require('express');
const router = new Router();

const Place = require('../models/place');

router.get('/create', (req, res, next) => {
  res.render('places/create');
});

router.post('/create', (req, res, next) => {
  const { name, type, latitude, longitude } = req.body;
  Place.create({
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      res.render('places/single', { place });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;

  Place.findById(id)
    .then(place => {
      if (place) {
        res.render('places/edit');
      } else {
        next();
      }
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const { name, type, latitude, longitude } = req.body;

  Place.findByIdAndUpdate(id, {
    name,
    type,
    location: {
      coordinates: [longitude, latitude]
    }
  })
    .then(place => {
      console.log('updated sucessfully', place);
      res.redirect(`/places/${place._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Place.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
