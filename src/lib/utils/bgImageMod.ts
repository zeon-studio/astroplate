import { getImage } from "astro:assets";

const bgImageMod = async (
  src: string,
  format?: "auto" | "avif" | "jpeg" | "png" | "svg" | "webp",
) => {
  src = `/public${src}`;
  const images = import.meta.glob("/public/images/**/*.{jpeg,jpg,png,gif}");

  // Check if the source path is valid
  if (!src || !images[src]) {
    console.error(
      `\x1b[31mImage not found - ${src}.\x1b[0m Make sure the image is in the /public/images folder.`,
    );

    return ""; // Return an empty string if the image is not found
  }

  // Function to get the image info like width, height, format, etc.
  const getImagePath = async (image: string) => {
    try {
      const imageData = (await images[image]()) as any;
      return imageData;
    } catch (error) {
      return `Image not found - ${src}. Make sure the image is in the /public/images folder.`;
    }
  };

  // Get the image data for the specified source path
  const image = await getImagePath(src);

  // Optimize the image for development
  const ImageMod = await getImage({
    src: image.default,
    format: format,
  });

  return ImageMod.src;
};

export default bgImageMod;
