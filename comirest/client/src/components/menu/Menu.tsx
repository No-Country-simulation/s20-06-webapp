import { CardsHorizontal } from "../Cards/CardsHorizontal"
import { CardsVertical } from "../Cards/CardsVertical"
import Footer from "../footer/Footer"
import { FaArrowLeft } from "react-icons/fa6";
import { NavBar } from "../NavBar/NavBar";

function Menu() {
    return (
        <div>
            <div className='flex items-center h-12 my-auto p-5'>
                <FaArrowLeft
                    size={25}
                    color="#E71B1E"
                />
            </div>

            <div className="relative">

                <p className="absolute z-10 inset-0 flex justify-center items-center text-white text-6xl font-inter font-bold">
                    Carta
                </p>

                <img className='w-full h-48 object-cover brightness-75' src="./Imagen Carta.jpg" />
            </div>


            <NavBar />
            

            <div className="w-full">

                <div className="flex flex-row justify-center px-5 w-fit mx-auto py-5">
                    <CardsHorizontal
                        name="RAVIOLI"
                        description=""
                        price={500}
                        image=""
                    />
                </div>

                <hr className='flex justify-center items-center w-11/12 border-t border-comiRed my-4 mx-auto' />

                <div className='flex w-fit text-right mx-auto font-poppins px-5 py-5 '>

                    <CardsHorizontal
                        reverse={true}
                    />
                </div>

            </div>

            <hr className='flex justify-center items-center w-11/12 border-t border-comiRed my-4 mx-auto' />

            <div className="grid grid-cols-3 justify-center gap-x-8 gap-y-6 mx-auto p-8">
                <CardsVertical />
                <CardsVertical />
                <CardsVertical />
            </div>

            <Footer />

        </div>
    )
}

export default Menu