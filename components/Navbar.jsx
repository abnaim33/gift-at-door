import React, { useContext, useState } from 'react'
import { RiMoonFill, RiSunLine } from 'react-icons/ri'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useTheme } from 'next-themes'
import Link from 'next/link'

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
        <header className='w-full sm:px-20  px-4 bg-white shadow 
      z-50 dark:bg-[#121212] dark:border-b '>
            <div className='justify-between md:items-center md:flex'>
                <div>

                    <div className='flex items-center justify-between py-3'>
                        <div className='md:py-5 md:block'>
                            <Link href="/" className='text-2xl font-bold dark:text-white'>Starter</Link>
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
                        <div className='items-center space-y-4 md:space-y-0 justify-center flex flex-col md:flex-row md:space-x-6 '>
                            {
                                Navbar_Items.map((item, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={item.page}
                                            className={
                                                "block lg:inline-block text-neutral-900 hover:text-neutral-500 dark:text-neutral-100"
                                            }

                                            onClick={() => setNavbar(!navbar)}
                                        >
                                            {item.label}
                                        </Link>
                                    )

                                })
                            }



                            {
                                currentTheme === 'dark' ? (

                                    <button onClick={() => setTheme("light")}
                                        className="bg-slate-100 p-2 rounded-xl cursor-pointer">
                                        <RiSunLine size={25} color="black" />
                                    </button>
                                ) :
                                    <button onClick={() => setTheme("dark")}
                                        className="bg-slate-100 p-2 rounded-xl cursor-pointer">
                                        <RiMoonFill size={25} color="black" />
                                    </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar