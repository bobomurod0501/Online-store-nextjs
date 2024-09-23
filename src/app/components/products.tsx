"use client";

import { ProductsType } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./image";

const Products: FC<{ product: ProductsType }> = ({ product }) => {
  console.log(product);
  return (
    <Link href={`/product/${product.id}`} className="h-96 flex flex-col  p-6 rounded-lg group hover:scale-105 transition-transform ease-out duration-200 border">
      <div className="relative max-h-72 flex-1 ">
        <CustomImage product={product} fill/>
      </div>
      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <h2 className="text-lg text-gray-900 font-medium title-font mb-4 line-clamp-1 font-bold">
        {product.title}
      </h2>
      <h2 className="font-black">{product.price}$</h2>
      <p className="leading-relaxed text-base line-clamp-3">
        {product.description}
      </p>
    </Link>
  );
};

export default Products;
