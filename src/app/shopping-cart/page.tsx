"use client";

import React, { useEffect, useState } from "react";
import CustomImage from "../components/image";
import { ProductsType } from "@/interface";
import Link from "next/link";

function ShoppingCard() {
  const [totle, setTotle] = useState<number>(0);
  const [shipping, setShipping] = useState(15);
  const [productData, setProductData] = useState<ProductsType[]>(
    JSON.parse(localStorage.getItem("carts") as string) || []
  );

  // setProductData(data)
  const removeProduct = (id: number) => {
    const updateCart = productData.filter((el) => el.id != id);
    localStorage.setItem("carts", JSON.stringify(updateCart));
    setProductData(updateCart);
  };

  const handleIncrement = (id: number) => {
    const updateCart = productData.map((el) => {
      if (el.id == id) {
        return {
          ...el,
          quantity: el.quantity + 1,
        };
      }
      return el;
    });
    localStorage.setItem("carts", JSON.stringify(updateCart));
    setProductData(updateCart);
  };
  const handleDecrement = (id: number) => {
    const exitProduct = productData.find((product) => product.id == id);
    if (exitProduct?.quantity == 1) {
      removeProduct(exitProduct.id);
    } else {
      const updateCart = productData.map((el) => {
        if (el.id == id) {
          return {
            ...el,
            quantity: el.quantity - 1,
          };
        }
        return el;
      });
      localStorage.setItem("carts", JSON.stringify(updateCart));
      setProductData(updateCart);
    }
  };

  useEffect(() => {
    const total = productData.reduce((ecc, item) => {
      return ecc + item.price * item.quantity;
    }, 0);
    setTotle(total);
  }, productData);

  return (
    <>
      {productData.length ? (
        <div>
          <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
                Shopping Cart
              </h2>
              <div className="hidden lg:grid grid-cols-2 py-6">
                <div className="font-normal text-xl leading-8 text-gray-500">
                  Product
                </div>
                <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                  <span className="w-full max-w-[200px] text-center">
                    Delivery Charge
                  </span>
                  <span className="w-full max-w-[260px] text-center">
                    Quantity
                  </span>
                  <span className="w-full max-w-[200px] text-center">
                    Total
                  </span>
                </p>
              </div>

              {productData?.map((elm) => (
                <div
                  key={elm.id}
                  className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6"
                >
                  <div className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div className="img-box relative w-52">
                      <img
                        src={elm.image}
                        alt="perfume bottle image"
                        className="xl:w-[130px] rounded-xl object-cover"
                      />
                      {/* <CustomImage product={data} fill /> */}
                    </div>
                    <div className="pro-data w-full max-w-sm ">
                      <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center line-clamp-2">
                        {elm.title}
                      </h5>
                      <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                        Perfumes
                      </p>
                      <h6 className="font-medium text-lg leading-8 text-indigo-600  max-[550px]:text-center">
                        ${elm.price}
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                      ${shipping}.00{" "}
                      <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">
                        (Delivery Charge)
                      </span>
                    </h6>
                    <div className="flex items-center w-full mx-auto justify-center">
                      <button
                        onClick={() => handleDecrement(elm.id)}
                        className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                        placeholder={elm.quantity}
                      />
                      <button
                        onClick={() => handleIncrement(elm.id)}
                        className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                      ${(elm.price * elm.quantity).toFixed(2)}
                    </h6>
                    <button
                      onClick={() => removeProduct(elm.id)}
                      className="delete"
                    >
                      <img
                        className="w-50"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAd5JREFUaEPtmMlKBDEURU+7VnCva8GvEBxB/QDBYS+68E9cKOLSAfwMVyKI4tK/UJxw2NmvqYIYqpok71W3hellk9zc++5N8lIdWv7rtJw/WcCwHcwOZAeUFcgRUhZQPT07oC6hEuDfOzAOPCuLqMLQOLAFHAILwE2iiDXguMC4TcFIFSDkT6DXS70DM8B9JAEhf+FgLAHXkRhJzdw08OAt9ArMAXeBBDaAc2/sIzAJfAVi9IalOrANHHkLvQCzAU64lS8hPgBx4CqGvEaAzE0RYUpeKyBWhDl5CwGhIqrIS9blBIuOjRuz1D3gR7VfnKac06acJ+RXgMvYzPvjrQQI7k5xL7hrvAFj3qLfwLIFeasIufz2gP0+VTWrfLmGpQMlZp0Ic/JNOFC3qeX/Vgio2sxuosxFWEZoFzjw8i+beNS78T+7LcfqX9vE/Y5R6Z3OgBFHnJkTFg6EtBTrNSKGfpGFkC8LXyUiuYmzOEZjyDcmIjVCKeQbEZEioO5BM9/tb0KfhZvAqXc6PQETg3rQWDwp3T0hz9KBPSnLKFg86kWEfBhYjHDv11WTEiEXQPVJpABSYWgFaNt59fwsQF1CJUB2QFlA9fTsgLqESoDsgLKA6unZAXUJlQCtd+AHC0hyMSHqjA4AAAAASUVORK5CYII="
                      />
                    </button>
                  </div>
                </div>
              ))}

              <h1>__________</h1>
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div className="flex items-center justify-between w-full mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-400">
                    Sub Total
                  </p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">
                    {`$ ${(totle).toFixed(2)}`}
                  </h6>
                </div>
                <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                  <p className="font-normal text-xl leading-8 text-gray-400">
                    Delivery Charge
                  </p>
                  <h6 className="font-semibold text-xl leading-8 text-gray-900">
                    $15.00
                  </h6>
                </div>
                <div className="flex items-center justify-between w-full py-6">
                  <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
                    {`$ ${(shipping + totle).toFixed(2)}`}
                  </h6>
                </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <button className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 hover:bg-indigo-100">
                  <span className="px-2 font-semibold text-lg leading-8 text-indigo-600">
                    Add Coupon Code
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998"
                      stroke="#4F46E5"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </section>
          ;
        </div>
      ) : (
        <section className="bg-white dark:bg-gray-900 ">
          <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
            <div className="flex flex-col items-center max-w-sm mx-auto text-center">
              <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </p>
              <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
               Currently Your bag is empty
              </h1>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                The page you are looking for doesn't exist. Here are some
                helpful links:
              </p>

              <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>
                  <Link href={"/alproducts"}>
                    <span>All Products</span>
                  </Link>
                </button>

                <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                  Take me home
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ShoppingCard;
