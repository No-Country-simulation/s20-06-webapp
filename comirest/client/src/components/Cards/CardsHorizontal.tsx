
interface CardsHorizontalProps {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    reverse?: boolean;
}

export const CardsHorizontal = ({ name, description, price, image, reverse }: CardsHorizontalProps) => {
    return (
        <div className={`flex justify-center w-fit font-poppins mx-auto px-32 ${reverse ? "flex-row-reverse" : "flex-row"
            }`}>

            <img className='max-w-60 max-h-48' src={image ? image : "./FoodTemplate.png"} alt='./FoodTemplate.png' />

            <div className='px-24 w-fit'>
                <h3 className='font-bold text-xl'>{name ? name : "COMIREST"}</h3>
                <div className='text-base space-y-2 pt-5'>

                    <p>
                        {description ? description : "Deliciosa comida recién preparada con ingredientes frescos para disfrutar al máximo."}
                    </p>
                </div>


                <div className={`${reverse ? "flex justify-end gap-5 pt-5" : "flex justify-start gap-5 pt-5"}`}>
                    <p className='font-bold'>{price ? `$${price}` : "$$$$"}</p>

                    <button className='text-comiRed'>Agregar</button>
                </div>
            </div>

        </div>
    )
}
