"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductsType } from "@/interface";
import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import CustomImage from "@/app/components/image";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import ReactStars from "react-stars";
import {toast} from 'react-toastify'



function DetailedProductPage() {
  const [isLoading, setIsloading] = useState(false);
  const [products, setProduct] = useState<ProductsType>();
  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const router = useRouter();

  const handleClick = () => {
    const product = JSON.parse(localStorage.getItem("carts") as string) || [];
    const isExitProduct = product.find(el => el.id == products.id)
    if(isExitProduct){
      const updatedata = product.map((el) => {
        if(el.id == products.id){
          return {
            ...el, quantity:el.quantity + 1  
          }
        }else {
          return el
        }
      })
      localStorage.setItem("carts", JSON.stringify(updatedata));
    }else{
      const data = [...product, {...products, quantity: 1}]
      localStorage.setItem("carts", JSON.stringify(data));
      toast("Product added your Bag")
    }
    // console.log(product);
    // console.log(data)
  };
  useEffect(() => {
    async function getData() {
      setIsloading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      const product = await res.json();
      setProduct(product);
      setIsloading(false);
    }
    getData();
  }, [params.id]);

  // console.log(products);
  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden={true} />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={"mx-auto max-w-3xl rounded bg-white p-10"}>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin"></div>
            ) : (
              <div className="flex gap-x-8 h-96">
                {products?.image && (
                  <div className="relative h-full w-72 hidden md:inline">
                    <CustomImage product={products} fill />
                  </div>
                )}
                <div className="flex flex-1 flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold">{products?.title}</h4>
                    <p className="font-medium text-sm">{products?.price}</p>
                    <div className="flex items-center text-sm my-4">
                      <p>{products?.rating.rate}</p>
                      {products?.rating.rate && (
                        <div className="flex items-center ml-2 mr-6">
                          {Array.from(
                            { length: Math.floor(products?.rating.rate) },
                            (i) => (
                              <StarIcon
                                key={i}
                                className="w-4 h-4 text-yellow-500"
                              />
                            )
                          )}
                          {Array.from(
                            { length: 5 - Math.floor(products?.rating.rate) },
                            (i) => (
                              <StarIconOutline
                                key={i}
                                className="w-4 h-4 text-yellow-500"
                              />
                            )
                          )}
                          {/* <ReactStars
                            value={products?.rating.rate}
                            edit={false}
                          /> */}
                        </div>
                      )}
                      <p className="text-blue-600 hover:underline cursor-pointer text-xs">
                        See all {products?.rating.count} reviews
                      </p>
                    </div>
                    <p className="line-clamp-6 text-sm">
                      {products?.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <button
                      className="button w-full text-white border-transparent bg-blue-600 hover:bg-transparent hover:border-blue-600  hover:text-black"
                      onClick={handleClick}
                    >
                      Add to bag
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="button w-full border-blue-600 bg-transparent hover:bg-blue-600 hover:border-transparent hover:text-white"
                    >
                      View full details
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}

export default DetailedProductPage;
