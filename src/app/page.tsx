import { ProductsType } from "@/interface";
import Products from "./components/products"
import HeroPage from "./components/heroPage";
import Footer from "./components/footer";

export default async function Home() {

const res = await fetch('https://fakestoreapi.com/products')
const product:ProductsType[] = await res.json()
  return (
    <main className="min-h-screen max-w-7xl mx-auto ">
        <HeroPage />
      <section className="flex flex-col space-y-12">
        <h1 className="text-5xl font-bold text-center">Bobomurod</h1>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {
            product.map((prod) => (
              <Products key={prod.id} product={prod}/>
            ))
          }
        </div>
      </section>
      <Footer />
    </main>
  );
}
