
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

                <div className='flex justify-center w-fit font-poppins mx-auto px-32'>

                    <img className='max-w-60' src='./RAVIOLI.jpg' />

                    <div className='px-24 w-fit'>
                        <h3 className='font-bold text-xl'>RAVIOLI</h3>
                        <div className='text-base space-y-2 pt-5'>
                            <p>
                                Ricota, jamón y mozzarella
                            </p>
                            <p>
                                Con salsa a elección de tomate, blanca o mixta
                            </p>
                            <p>
                                + Gaseosa o Agua saborizada chica a elección
                            </p>
                        </div>


                        <div className='flex justify-start gap-5 pt-5'>
                            <p className='font-bold'>$9999</p>

                            <button className='text-comiRed'>Agregar</button>
                        </div>
                    </div>

                </div>


                <hr className='flex justify-center items-center w-11/12 border-t border-comiRed my-4 mx-auto' />


                <div className='flex w-fit text-right mx-auto font-poppins px-32 flex-row-reverse'>

                    <img className='max-w-60' src='./RAVIOLI.jpg' />

                    <div className='px-24 w-fit'>
                        <h3 className='font-bold text-xl'>RAVIOLI</h3>
                        <div className='text-base space-y-2 pt-5'>
                            <p>
                                Ricota, jamón y mozzarella
                            </p>
                            <p>
                                Con salsa a elección de tomate, blanca o mixta
                            </p>
                            <p>
                                + Gaseosa o Agua saborizada chica a elección
                            </p>
                        </div>

                        <div className='flex justify-end gap-5 pt-5'>
                            <p className='font-bold'>$9999</p>

                            <button className='text-comiRed'>Agregar</button>
                        </div>
                    </div>
                </div>
           </div>

           <hr className='flex justify-center items-center w-11/12 border-t border-comiRed my-4 mx-auto' />

            <div>CARROUSEL</div>



        </div>
    )
}

export default Menu