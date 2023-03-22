import Navbar from "../components/Navbar";
import Head from 'next/head'
import Header from "../components/Header";
import Menu from "../components/Menu";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Products from "../components/Products";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div>

      <Head>
        <title>
          Gift At Home
        </title>
      </Head>

      <Navbar />
      <Header />
      <Menu />

      <Products />

      <Footer />
    </div>
  )
}