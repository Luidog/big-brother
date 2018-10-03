'use strict'

const { FaceRecognizer, FaceDetector, loadImage } = require('face-recognition');
const _ = require('lodash')

const detector = FaceDetector()
const recognizer = FaceRecognizer()

exports.train = (req,res)=>{
  const images = req.files.map(file=>detector.detectFaces(loadImage(file.path)))
  recognizer.addFaces(_.flatten(images), req.body.name)
  res.status(200).json(recognizer.serialize())
}

exports.train = (req,res)=>{
  const images = req.files.map(file=>detector.detectFaces(loadImage(file.path)))
  recognizer.addFaces(_.flatten(images), req.body.name)
  res.status(200).json(recognizer.serialize())
}