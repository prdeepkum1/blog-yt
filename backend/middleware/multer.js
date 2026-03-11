// multer file ko recive krta hai

import multer from "multer"

const storage = multer.memoryStorage()

export const singleUpload = multer({storage}).single("file")