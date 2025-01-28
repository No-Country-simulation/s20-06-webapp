interface CardsVerticalProps {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
}

export const CardsVertical = ({ name, description, price, image }: CardsVerticalProps) => {
    return (
        <div className="flex flex-col w-64 items-center overflow-hidden font-poppins mx-auto">

            <img
                className="w-full h-40 object-cover"
                src={image || "./FoodTemplate.png"}
                alt={name || "Food Image"}
            />


            <div className="p-4 text-center">

                <h3 className="font-bold text-xl mb-2">{name || "COMIREST"}</h3>


                <p className="text-sm mb-4">
                    {description ||
                        "Deliciosa comida recién preparada con ingredientes frescos para disfrutar al máximo."}
                </p>

                <div className="flex justify-between items-center">
                    <p className="font-bold">{price ? `$${price}` : "$$$$"}</p>
                    <button className="px-4 py-2 text-comiRed">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    );
};
