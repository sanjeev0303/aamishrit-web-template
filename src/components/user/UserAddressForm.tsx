"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserAddress, useCreateUserAddress } from "@/hooks/useAddress";
import { UserAddress } from "@/types";

const defaultAddress: UserAddress = {
  street: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
  isDefault: false,
};

const UserAddressForm = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const router = useRouter();
  const { data, isLoading } = useUserAddress();
  const { mutate: createAddress, isPending } = useCreateUserAddress({
    onSuccess: () => router.push("/checkout/confirm"),
  });

  const [address, setAddress] = useState<UserAddress>(defaultAddress);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!isLoading && !initialized) {
      setAddress(data || defaultAddress);
      setInitialized(true);
    }
  }, [data, isLoading, initialized]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAddress(address);
  };

  if (!isLoggedIn) return null;

  if (isLoading || !initialized) {
    return (
      <div className="space-y-6 mt-12 max-w-xl mx-auto bg-brown-100 rounded-2xl p-8 animate-pulse shadow-xl">
        <h2 className="text-3xl font-bold text-center text-brown-800">
          Address Form
        </h2>
        {["street", "city", "state", "country", "zipCode"].map((field) => (
          <div key={field} className="space-y-2">
            <div className="h-4 bg-brown-200 rounded w-1/3"></div>
            <div className="h-10 bg-brown-300 rounded"></div>
          </div>
        ))}
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 bg-brown-300 rounded"></div>
          <div className="h-4 bg-brown-200 rounded w-1/4"></div>
        </div>
        <div className="h-12 bg-brown-400 rounded"></div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-12 max-w-xl mx-auto bg-brown-50 border border-brown-200 rounded-2xl p-8 shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-brown-800 tracking-wide">
        Delivery Address
      </h2>

      {["street", "city", "state", "country", "zipCode"].map((field) => (
        <div key={field} className="flex flex-col space-y-1">
          <label
            htmlFor={field}
            className="text-sm font-medium text-brown-700"
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            id={field}
            type="text"
            name={field}
            placeholder={`Enter your ${field}`}
            value={(address as any)[field] || ""}
            onChange={handleChange}
            className="w-full border border-brown-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500 bg-white text-brown-800 placeholder:text-brown-400"
          />
        </div>
      ))}

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="isDefault"
          checked={!!address.isDefault}
          onChange={handleChange}
          className="h-4 w-4 text-brown-600 focus:ring-brown-400 border-brown-300 rounded"
        />
        <label className="text-sm text-brown-700">Set as default address</label>
      </div>

      <button
        type="submit"
        className="w-full bg-brown-700 text-white py-2 rounded-lg text-lg font-medium hover:bg-brown-800 transition duration-200 disabled:opacity-50"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
};

export default UserAddressForm;
