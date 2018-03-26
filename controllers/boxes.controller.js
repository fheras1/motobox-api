const mongoose = require('mongoose');
const Box = require('../models/box.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Box.find()
    .then(boxes => res.json(boxes))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Box.findById(id)
    .then(box => {
      if (box) {
        res.json(box)
      } else {
        next(new ApiError(`Box not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const box = new Box(req.body);
  box.save()
    .then(() => {
      res.status(201).json(box);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        console.log(error);
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Box.findByIdAndRemove(id)
    .then(box => {
      if (box) {
        res.status(204).json()
      } else {
        next(new ApiError(`Box not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Box.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(box => {
      if (box) {
        res.status(200).json(box)
      } else {
        next(new ApiError(`Box not found`, 404));
      }
    }).catch(error => next(error));
}