import '../styles/globals.css'
import { ThemeProvider } from 'next-themes'
import Navbar from '../components/Navbar'
import Header from "../components/Header";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { DataProvider } from '../store/GlobalState';
import Notify from '../components/Notify';
// import { DataProvider } from '../store/GlobalState';
// import Notify from '../components/Notify';
function MyApp({ Component, pageProps }) {
  return <>
    <ToastContainer />
    <DataProvider>

      <ThemeProvider enableSystem={true}
        attribute="class">


        {/* <Navbar /> */}

        <Notify />
        <Navbar />
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </DataProvider>
  </>
}

export default MyApp
