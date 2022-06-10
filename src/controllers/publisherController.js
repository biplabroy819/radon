const PublisherModel= require("../models/newPublisher")

const createPublisher= async function (req, res) {
    let publisher = req.body
    let publisherCreated = await PublisherModel.create(publisher)
    res.send({data: publisherCreated})
}


module.exports.createPublisher= createPublisher
















// module.exports.getPublisherData= getPublisherData
// const getPublisherData= async function (req, res) {
//     let publishers = await AuthorModel.find()
//     res.send({data: publishers})
// }