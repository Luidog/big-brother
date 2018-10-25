'use strict';

const cv = require('opencv4nodejs');
const {
  FaceRecognizer,
  FaceDetector,
  loadImage,
  CvImage,
  cvImageToImageRGB
} = require('face-recognition').withCv(cv);
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
        .find('Faces', Object.assign(req.body, { imageName: '*' }))
        .then(response => transform(response.data))
        .then(records => {
          console.log(records);
          return _.map(
            records,
            (record, index, collection) =>
              record.image !== ''
                ? image
                    .transport(record.image, {
                      name: `${record.recordId}-${record.imageName}`
                    })
                    .then(response => {
                      console.log(response);
                      recognizer.addFaces(
                        detector.detectFaces(
                          loadImage(path.join('./data', response.location))
                        ),
                        req.body.name
                      );
                    })
                    .then(() =>
                      client
                        .edit('Faces', record.recordId, {
                          descriptor: recognizer.serialize()
                        })
                        .catch(error => logger.error(error.message, error))
                    )
                : { recordId: record.recordId, message: 'No Image Found' }
          );
        });
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.boom.badRequest(error.message));

exports.recognize = (req, res) =>
  Filemaker.findOne()
    .then(client => {
      console.log(req.body);
      return client
        .find('Faces', req.body, { limit: 1 })
        .then(response => transform(response.data[0]))
        .then(record =>
          image
            .transport(record.image, {
              name: `${record.recordId}-${record.imageName}`
            })
            .then(response =>
              client.edit('Faces', record.recordId, {
                prediction: recognizer.predict(
                  loadImage(path.join('./data', response.location))
                )
              })
            )
        );
    })
    .then(response => res.status(200).json(response))
    .catch(error => res.boom.badRequest(error.message));
