import sharp from "sharp";

export const imageResize = async (req, res) => {
  try {
    const { baseUrl, dimention } = req.body;
    let { size, quality } = req.body;

    const base64Data = baseUrl.split(";base64,").pop();
    const buffer = Buffer.from(base64Data, "base64");

    if (size) {
      const sizeInBytes = (base64Data.length * 3) / 4;
      const sizeInKB = (sizeInBytes / 1024).toFixed(2);

      quality = Math.round((size / sizeInKB) * 100);
    }

    if (!quality) {
      quality = 100;
    }

    const resizedBuffer = await sharp(buffer)
      .resize({
        width: Number(dimention.width),
        height: Number(dimention.height),
        fit: "cover",
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen()
      .jpeg({ quality })
      .toBuffer();

    const resizedBase64 = `data:image/png;base64,${resizedBuffer.toString(
      "base64"
    )}`;

    return res.status(200).json({
      message: "Image resized successfully!",
      resizedImage: resizedBase64,
    });
  } catch (error) {
    return res.status(500).json({ message: "Interval server error!" });
  }
};
