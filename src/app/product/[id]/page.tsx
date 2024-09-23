import CustomImage from "@/app/components/image";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: number;
  };
}
const DetailsPage = async ({ params: { id } }: Props) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const products = await res.json();
    return (
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10">
        <CustomImage product={products}/>
        <div className="divide-2">
            <div className="space-y-2 pb-8">
                <h1 className="text-2xl md:text-4xl font-bold">
                    {products.title}
                </h1>
                <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
                    {products.price}
                </h2>
            </div>
            <div>
                <p className="text-xs md:text-sm">
                    {products.description}
                </p>
            </div>

            
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
};

export default DetailsPage;
