//const path = require('path')

const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const cloudinary = require('cloudinary').v2

// remove temt pile
const fs = require('fs')

exports.uploadProductImage = async (req, res) => {
  //  to make sure img file exist  then: console log beloow code
  console.log(req.files)
  // Image will be ound under   req.files.image.tempFilePath

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'file-upload-smilga',
    }
  )
  fs.unlinkSync(req.files.image.tempFilePath)
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}
