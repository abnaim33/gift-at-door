import Head from 'next/head'
import { useState, useContext } from 'react'
import { getData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const DetailProduct = (props) => {
    const [product] = useState(props.product)
    const [tab, setTab] = useState(0)

    const { state, dispatch } = useContext(DataContext)
    const { cart } = state

    const isActive = (index) => {
        if (tab === index) return " active";
        return ""
    }

    return (
        <div className="flex flex-col  md:flex-row mx-20 mt-20 md:mt-32 items-center justify-between ">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="w-full md:w-1/2">
                <img src={product.images[tab].url} alt={product.images[tab].url}
                    className="d-block img-thumbnail rounded mt-4 w-full md:w-2/3"
                    style={{ height: '350px' }} />

                <div className="flex mx-0 cursor-pointer mt-2 w-full"  >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                            className={`img-thumbnail rounded h-[80px] w-full md:w-1/3 ${isActive(index)}`}

                            onClick={() => setTab(index)} />
                    ))}

                </div>
            </div>

            <div className="w-full md:w-1/2 mt-3 md:mt-0">
                <h2 className="">{product.title}</h2>
                <h5 className="text-danger">${product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                            ? <h6 className="text-green-600">In Stock: {product.inStock}</h6>
                            : <h6 className="text-red-600">Out Stock</h6>
                    }

                    <h6 className="text-teal-600">Sold: {product.sold}</h6>
                </div>

                <div className="my-2">{product.description}</div>
                <div className="my-2">
                    {product.content}
                </div>

                <button type="button" className="inline-flex items-center px-5 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => dispatch(addToCart(product, cart))} >
                    Buy Now
                </button>

            </div>
        </div>
    )
}

export async function getServerSideProps({ params: { id } }) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
        props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct