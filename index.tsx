
import productImage from "@/public/images/productimage.jpg";
import ImageZoomViewer from "./product-image-viewer"; 

export default function ProductBanner({}: {}) {
  const productInfo = {
    name: "Pebble Smartwatch",
    image: productImage,
    price: 199.99,
    isInStock: true,
  };

  return (
       <ImageZoomViewer
        imageSrc={productInfo.image.src}
        className="w-full"
      />
  );
}
