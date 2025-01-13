import Image from "next/image";

export default function CustomImage({
  imageUrl,
  customHeight = 500,
  customWidth = 500,
  customClassName = "",
}: any) {
  const linkContain = imageUrl?.replaceAll('http://localhost:3005', '');
  return (
    <Image
      src={linkContain}
      priority
      quality={100}
      alt="Alt Pic"
      className={` !h-full !w-full !object-cover !object-center ${customClassName}`}
      width={customWidth}
      height={customHeight}
    />
  );
}
