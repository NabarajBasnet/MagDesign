'use client'


const Footer = () => {
    return (
        <>
            <div className="flex w-full">
                <div className="flex flex-col w-full items-center p-4 justify-center">
                    <div className="w-full p-6 bg-gray-200">
                        <div className="text-3xl font-bold">
                            <h1>Subscribe to newsletter</h1>
                        </div>
                        <div className="flex lg:flex-row md:flex-col sm:flex-col w-full  items-center">
                            <input type="email" placeholder="Enter your email" className="m-2 border-2 outline-none placeholder:text-xl placeholder:text-gray-500 border-gray-500 rounded-lg w-2/3 p-5" />
                            <button className="bg-orange-500 hover:bg-white hover:text-orange-500 hover:shadow-lg w-1/3 h-16 transition-all rounded-full text-white m-2 font-bold ">SUBSCRIBE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Footer;