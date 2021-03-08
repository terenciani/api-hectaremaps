"use strict";

const fs = require('fs')
module.exports = class ImageService {

    static async existsImage(relativePath) {
        try {
            if (fs.existsSync(relativePath))
                return true
            return false
        } catch (error) {
            throw new Error("ImageService.getImage: " + error);
        }
    } // getImage()
} // class