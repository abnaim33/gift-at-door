import React, { useContext, useState } from 'react'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { CiLocationOn } from 'react-icons/ci'
const Navbar_Items = [
    {
        label: "Home",
        page: "home"
    },
    {
        label: "About",
        page: "about"
    },
    {
        label: "Projects",
        page: "projects"
    }
]

const Navbar = () => {

    const { systemTheme, theme, setTheme } = useTheme()
    const currentTheme = theme === 'system' ? systemTheme : theme
    const [navbar, setNavbar] = useState(false)


    return (
        <nav className='w-full sm:px-20  px-4 bg-white shadow 
      z-50 dark:bg-[#121212] dark:border-b '>
            <div className='justify-between md:items-center md:flex'>
                <div>

                    <div className='flex items-center justify-between py-3'>
                        <div className='md:py-5 hidden md:block'>
                            <h1 className='flex items-center text-gray-600 text-sm'> <CiLocationOn size={20} />Dhaka,Bangladesh</h1>

                        </div>

                        <div className='md:hidden block w-[40%]'>
                            <img src="https://res.cloudinary.com/dsuh9ww6d/image/upload/v1679156627/logo__2_-removebg-preview_qvzmna.png" alt=""
                                className='w-full' />
                        </div>

                        <div className='md:hidden'
                            onClick={() => setNavbar(!navbar)}>
                            <button>{navbar ? <IoMdClose size={30} />
                                : <IoMdMenu size={30} />}</button>
                        </div>

                    </div>


                </div>
                <div>
                    <div className={`flex-1 justify-self-center pb-3 mt-0 md:block md:pb-0 md:mt-0
${navbar ? 'block' : 'hidden'}`}>
                        <div className='items-center space-y-4 md:space-y-0 justify-center text-sm flex flex-col md:flex-row md:space-x-6 '>


                            <Link

                                href='/signin'
                                className={
                                    "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                }

                                onClick={() => setNavbar(!navbar)}
                            >
                                Sign in / Register
                            </Link>

                            <Link

                                href="/about"
                                className={
                                    "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                }

                                onClick={() => setNavbar(!navbar)}
                            >
                                About Us
                            </Link>

                            <Link

                                href="/track-orders"
                                className={
                                    "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                }

                                onClick={() => setNavbar(!navbar)}
                            >
                                Track Orders
                            </Link>

                            {
                                currentTheme === 'dark' ? (

                                    <button onClick={() => setTheme("light")}
                                        className="bg-slate-100 p-2 rounded-xl cursor-pointer">
                                        <RiSunLine size={20} color="black" />
                                    </button>
                                ) :
                                    <button onClick={() => setTheme("dark")}
                                        className="bg-slate-100 p-2 rounded-xl cursor-pointer">
                                        <RiMoonFill size={20} color="black" />
                                    </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar