const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.post("/image", upload.single("image"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded"
            });
        }

        const result = await new Promise((resolve, reject) => {

            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "veyro"
                },
                (error, result) => {

                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }

                }
            );

            stream.end(req.file.buffer);

        });

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url,
            publicId: result.public_id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Image upload failed"
        });

    }

});

module.exports = router;