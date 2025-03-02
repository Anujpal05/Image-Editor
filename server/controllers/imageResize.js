import sharp from "sharp";

export const imageResize = async (req, res) => {
  try {
    const { baseUrl, dimention, quality, type } = req.body;

    const base64Data = baseUrl.split(";base64,").pop();
    const buffer = Buffer.from(base64Data, "base64");

    let resizedBuffer = await sharp(buffer)
      .resize({
        width: Number(dimention.width),
        height: Number(dimention.height),
        fit: "cover",
        kernel: sharp.kernel.lanczos3,
      })
      .sharpen()
      .toBuffer();

    const validFormats = ["jpeg", "jpg", "png", "webp", "avif"];
    const selectedFormat = validFormats.includes(type) ? type : "jpeg";

    resizedBuffer = await sharp(resizedBuffer)
      .toFormat(selectedFormat, { quality })
      .toBuffer();

    const resizedBase64 = `data:image/${selectedFormat};base64,${resizedBuffer.toString(
      "base64"
    )}`;

    return res.status(200).json({
      message: "Image resized successfully!",
      resizedImage: resizedBase64,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Interval server error!" });
  }
};
