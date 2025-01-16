import { SubmitHandler, useForm } from 'react-hook-form';


function Login() {

    type Inputs = {
        email: string;
        password: string;
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
        <div>

            <div className="flex flex-col justify-center items-center min-h-screen bg-comiWhite">
                <div className='text-center'>
                    LOGO COMIREST
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-[34.4] flex w-full max-w-md flex-col items-center gap-3 rounded-md border p-12 shadow-2xl bg-white"
                >
                    <div className='mb-10 text-4xl font-poppins font-bold text-center text-textColor'>
                        <h2>Inicia sesión</h2>
                    </div>

                    <label className="text-sm w-96 font-poppins text-textColor" htmlFor="email">*Email</label>

                    <input
                        type="email"
                        className={`font-poppins mb-4 px-1 h-10 w-96 rounded-md border border-comiRed outline-none ${errors.email && 'border-red-500'}`}
                        id="email"
                        {...register('email', {
                            required: 'Requiere emal',
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                message: 'Email invalido',
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="-mt-5 text-sm text-red-500">
                            {errors.email.message}
                        </span>
                    )}

                    <div className='flex justify-between w-96'>

                        <label className='font-poppins w-fit text-sm text-textColor' htmlFor="password">*Contraseña</label>

                        <span className="font-poppins w-fit text-sm cursor-pointer border-black">
                            ¿Olvidaste tu contraseña?
                        </span>

                    </div>

                    <input
                        type="password"
                        className={`mb-4 h-10 w-96 px-1 rounded-md border border-comiRed outline-none ${errors.email && 'border-red-500'}`}
                        id="password"
                        {...register('password', {
                            required: 'Requiere contraseña',
                            minLength: {
                                value: 6,
                                message: 'La contraseña debe tener minimo 6 caracteres',
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="-mt-5 text-sm text-red-500">
                            {errors.password.message}
                        </span>
                    )}

                    <button
                        type="submit"
                        className="font-poppins h-10 w-80 rounded-md bg-comiRed text-comiWhite font-bold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión'}
                    </button>

                    <button
                        type="submit"
                        className="font-poppins h-10 w-80 rounded-md text-textColor border border-comiRed font-normal"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión con Google'}
                    </button>


                    <div className='my-5 text-center'>
                        <p className="font-poppins text-sm text-textColor">
                            No tenés tu cuenta?{' '}
                            <span className="font-poppins text-comiRed font-semibold underline cursor-pointer border-black">
                                Registrate
                            </span>
                        </p>
                    </div>

                </form>
            </div>

            <div className='flex flex-col flex-grow bg-comiBrown text-white'>

                <div className='flex justify-between'>

                    <div>
                        PASTA NONNA

                    </div>

                    <div>

                        Facebook Ig
                    </div>

                    <form className='m-14 font-inter'>

                        <p>
                            Suscribete a<br /> nuestros beneficios
                        </p>

                        <input
                            type="email"
                            placeholder='Ingrese email'
                            className={`mb-4 h-10 text-textColor font-inter w-96 px-1 rounded-md outline-none ${errors.email && 'border-red-500'}`}
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

        </div>
    )
}

export default Login