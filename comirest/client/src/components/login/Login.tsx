import { SubmitHandler, useForm } from 'react-hook-form';


function Login() {

    type Inputs = {
        email: string;
        password: string;
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

            <div className=" mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className='text-center m-12'>
                    LOGO COMIREST
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="h-4/6 flex w-96 flex-col gap-2 rounded-md border p-6 shadow-2xl"
                >
                    <div className='text-4xl font-bold text-center my-4 text-textColor'>
                        <h2>Inicia sesión</h2>
                    </div>

                    <label className="text-sm text-textColor" htmlFor="email">*Email</label>

                    <input
                        type="email"
                        className={`mb-4 h-10 w-80 rounded-md border border-comiRed outline-none ${errors.email && 'border-red-500'}`}
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

                    <div className='flex justify-between w-80'>

                        <label className='w-fit text-sm text-textColor' htmlFor="password">*Contraseña</label>

                        <span className="w-fit text-sm cursor-pointer border-black">
                            ¿Olvidaste tu contraseña?
                        </span>

                    </div>

                    <input
                        type="password"
                        className={`mb-4 h-10 w-80 rounded-md border border-comiRed outline-none ${errors.email && 'border-red-500'}`}
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
                        className="h-10 w-64 mx-auto rounded-md bg-comiRed text-comiWhite font-bold"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión'}
                    </button>

                    <button
                        type="submit"
                        className="h-10 w-64 mx-auto rounded-md text-textColor border border-comiRed font-normal"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión con Google'}
                    </button>


                    <div className='my-5 text-center'>
                        <p className="text-sm text-textColor">
                            No tenés tu cuenta?{' '}
                            <span className="text-comiRed font-semibold underline cursor-pointer border-black">
                                Registrate
                            </span>
                        </p>
                    </div>

                </form>
            </div>

            <div className='h-44 mt-5 bg-[#242424] text-white'>

                <div className='flex justify-between'>

                    <div>
                        LOGO
                        Facebook Ig
                    </div>

                    <div>
                        Suscribete a nuestros beneficios
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login