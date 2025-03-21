import Image from "next/image";

type ImageProps = {
  src: string,
  alt: string,
  height?: number;
  width?: number
};

export default function ImageItem({src, alt, ...props}: ImageProps) {
  return (
    <Image src={src} alt={alt} {...props} className="aspect-3/2 object-cover rounded-md mr-5" priority />
  );
}
