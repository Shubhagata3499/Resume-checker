const express = require("express");
const cors = require("cors");
const cloudinary = require("./cloudinary");
const upload = require("./upload");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Resume Backend Running");
});

app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  try {
    console.log("Request received");

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    return res.json({
      message: "File received successfully",
      fileName: req.file.originalname,
      size: req.file.size,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});