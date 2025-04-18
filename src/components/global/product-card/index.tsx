import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  images: string;
  price: number;
  stock?: number;
  handler?: () => void;
};

const ProductCard = ({
  id,
  name,
images,
  price,
}: ProductCardProps) => {

  return (
    <div className="flex flex-col mx-auto">
            <Link href={`/products/${}`}>
            <div className="h-[22rem] rounded-lg overflow-hidden">
                      <Image
                        src={images}
                        alt={id}
                        width={1500}
                        height={500}
                        className="object-cover h-full rounded-lg"
                      />
                    </div>
            </Link>
            <div className="flex flex-col  px-2">
                <div className="text-brown-text font-medium text-lg">{name}</div>
                <div className="text-brown-heading font-medium text-[1.1rem]">₹ {price}.00</div>
            </div>
        </div>
  );
};



export default ProductCard;
