import Navbar from "../components/Navbar";
import Head from 'next/head'
import Header from "../components/Header";
import Menu from "../components/Menu";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { getData } from "../utils/fetchData";
export default function Home(props) {
  const [products, setProducts] = useState(props.products)
  useEffect(() => {
    setProducts(props.products)

  }, [props.products])

  return (
    <div>

      {/* just have to implement redux */}

      <Head>
        <title>
          Gift At Home
        </title>
      </Head>

      {/* <Navbar /> */}
      {/* <Header /> */}
      <Menu />

      <Products products={products} />

      <Footer />
    </div>
  )
}


export async function getServerSideProps(query) {
  // const res = await getData('product')
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(`product`)

  return {
    props: {
      products: res.products,
      result: res.result
    }
  }
}