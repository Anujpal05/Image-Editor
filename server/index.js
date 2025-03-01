import express from "express";
import cors from "cors";
import { imageResize } from "./controllers/imageResize.js";
const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.post("/edit-image", imageResize);

app.listen(PORT, () => {
  console.log("Server is running...");
});
