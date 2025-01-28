import { CardsHorizontal } from "../Cards/CardsHorizontal"
import { CardsVertical } from "../Cards/CardsVertical"

function Menu() {
    return (
        <div>
            <div className='h-12'>{"<===="}</div>
            <div className='flex justify-center h-28 bg-comiRed'>CARTA IMG</div>

            {/* NAVBAR */}
            <ul className='flex justify-between p-10 mb-5 text-comiRed font-poppins'>
                <li>PLATOS DEL DIA</li>
                <li>PASTAS</li>
                <li>BEBIDAS</li>
                <li>POSTRES</li>
                <li>DESAYUNOS</li>
            </ul>

            <div className="w-full">

                <div className="flex flex-row justify-center px-28 w-fit mx-auto py-5">
                    <CardsHorizontal
                        name="RAVIOLI"
                        description=""
                        price={500}
                        image=""
                    />
                </div>

                <hr className='flex justify-center items-center w-11/12 border-t border-comiRed my-4 mx-auto' />

                <div className='flex w-fit text-right mx-auto font-poppins px-28 py-5 '>

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

        </div>
    )
}

export default Menu