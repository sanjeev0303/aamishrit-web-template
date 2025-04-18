import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import { useAppDispatch } from "@/store/store";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const CartItemCard = ({
  item,
}: {
  item: {
    ID: string;
    name: string;
    price: number;
    quantity: number;
    images: string[];
  };
}) => {
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: string, name: string) => {
    dispatch(removeFromCart(id));
    toast.success(`${name} removed from cart`);
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div
      key={item.ID}
      className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 group bg-gradient-to-br from-brown-50 via-brown-100 to-brown-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ring-1 ring-brown-300/30 backdrop-blur-sm"
    >
      {/* Product Image */}
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 flex-shrink-0 bg-brown-100 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
        <Image
          src={item.images[0] || "/placeholder.svg?height=96&width=96"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-grow">
        {/* Title + Price */}
        <div className="flex justify-between items-start">
          <Link
            href={`/products/${item.ID}`}
            className="font-semibold text-lg sm:text-xl text-brown-800 hover:text-brown-600 transition-colors"
          >
            {item.name}
          </Link>
          <span className="text-brown-700 font-bold text-lg">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        <p className="text-sm text-brown-500 mt-1">
          {formatPrice(item.price)} × {item.quantity}
        </p>

        {/* Quantity + Remove */}
        <div className="flex justify-between items-center mt-6">
          {/* Quantity Controls */}
          <div className="flex items-center border border-brown-300 rounded-full overflow-hidden shadow-inner">
            <button
              className="px-3 py-2 hover:bg-brown-100 hover:text-brown-700 transition-all disabled:opacity-50"
              onClick={() =>
                handleUpdateQuantity(item.ID, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-5 py-2 border-x border-brown-300 text-lg font-medium text-brown-700">
              {item.quantity}
            </span>
            <button
              className="px-3 py-2 hover:bg-brown-100 hover:text-brown-700 transition-all"
              onClick={() => handleUpdateQuantity(item.ID, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Remove Item Button */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-brown-300 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => handleRemoveItem(item.ID, item.name)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
