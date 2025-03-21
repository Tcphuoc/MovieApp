import ImageItem from "./ImageItem";

export default function ListImages({ imageUrls }: { imageUrls: string[] }) {
  return (
    <div className="flex">
      {imageUrls.map((image, index) => {
        return (
          image && (
            <ImageItem
              key={index}
              src={image}
              alt="image"
              width={210}
              height={140}
            />
          )
        );
      })}
    </div>
  );
}
