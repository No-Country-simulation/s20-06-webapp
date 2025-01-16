import { SubmitHandler, useForm } from "react-hook-form";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";



function Footer() {

    type Inputs = {
        subscribeEmail: string;
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log('Logged', data);
    }



    return (

        <div className='flex flex-col flex-grow bg-comiBrown text-white'>

            <div className='flex justify-between'>

                <img src='./COMIRESTLOGO.png' className='flex justify-center items-center max-w-56 ml-10'></img>

                <div className='flex justify-center items-center gap-4 m-14'>

                    <FaFacebook
                        color='#E71B1E'
                        size={25} />
                    <FaInstagram
                        color='#E71B1E'
                        size={25} />

                </div>

                <form className='m-14 font-inter'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <p>
                        Suscribete a<br /> nuestros beneficios
                    </p>

                    <input
                        type="email"
                        placeholder='Ingrese email'
                        className={`mb-4 h-10 text-textColor font-inter w-96 px-1 rounded-md outline-none ${errors.subscribeEmail && 'border-red-500'}`}
                        id="subscribeEmail"
                        {...register('subscribeEmail', {
                            required: 'Requiere emal',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Email invalido',
                            },
                        })}
                    />
                    <button
                        type="submit"
                        className="h-7 w-24 text-sm tracking-wider font-inter m-5 rounded-sm text-comiWhite bg-comiRed font-normal"
                    >
                        {isSubmitting ? 'Suscrito!' : 'Suscribirse'}
                    </button>
                </form>


            </div>

        </div>
    )
}

export default Footer