'use strict';

const { FaceRecognizer, FaceDetector, loadImage } = require('face-recognition');
const { transform, Filemaker } = require('fms-api-client');
const { image, logger } = require('../../services');
const path = require('path');
const _ = require('lodash');

const detector = FaceDetector();
const recognizer = FaceRecognizer();

exports.train = (req, res) =>
  Filemaker.findOne()
    .then(client => {
      return client
        .find('Heroes', req.body)
        .then(response => transform(response.data))
        .then(records =>
          _.map(records, (record, index, collection) =>
            image
              .transport(value, {
                name: `${record.recordId}-${object['imageName']}`
              })
              .then(response => {
                recognizer.addFaces(
                  detector.detectFaces(
                    loadImage(path.join('./data', response.location))
                  ),
                  'lui'
                );
              })
              .then(() =>
                client
                  .edit('Heroes', record.recordId, {
                    faceDescriptor: recognizer.serialize()
                  })
                  .catch(error => logger.error(error.message, error))
              )
          )
        );
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.boom.badRequest(error.message));

exports.recognize = (req, res) => {
  const images = req.files.map(file =>
    detector.detectFaces(loadImage(file.path))
  );
  recognizer.predict(image)
  res.status(200).json(recognizer.serialize());
};
