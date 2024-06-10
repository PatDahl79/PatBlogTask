import React, { useContext } from 'react'
import Banner from '../assets/Banner.png';

function HeroSection() {
    return (
        <section>
            <div className="mx-auto flex items-center justify-center">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div>
                            {/* Image  */}
                            <div className="flex justify-center">
                                <img src={Banner}alt="" />
                            </div>

                            {/* Text  */}
                            <h1 className=' text-3xl text-white font-bold'>Bloggi</h1>
                        </div>

                        {/* Paragraph  */}
                        <p className="sm:text-3xl text-xl font-extralight sm:mx-auto ">
                            Here are some blogs and inspection by Bloggi.
                        </p>
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection