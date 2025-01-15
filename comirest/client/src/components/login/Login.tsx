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


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-96 flex-col gap-2 rounded-md border p-6"
            >
                <div className='text-center'>
                    <h2>Inicia sesión</h2>
                </div>

                <label className="text-sm" htmlFor="email">*Email</label>

                <input
                    type="email"
                    className={`mb-4 h-10 w-80 rounded-md border outline-none ${errors.email && 'border-red-500'}`}
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

                <div className='flex justify-between'>

                    <label className='w-fit text-sm' htmlFor="password">*Contraseña</label>

                    <span className="w-fit text-sm underline cursor-pointer border-black">
                        ¿Olvidaste tu contraseña?
                    </span>

                </div>

                <input
                    type="password"
                    className={`mb-4 h-10 w-80 rounded-md border outline-none ${errors.email && 'border-red-500'}`}
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
                    className="h-10 w-64 mx-auto rounded-md bg-gray-600 text-white"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión'}
                </button>

                <button
                    type="submit"
                    className="h-10 w-64 mx-auto rounded-md text-gray-600 border border-gray-600"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Iniciando sesión...' : 'Inicia sesión con Google'}
                </button>


            <div className='mt-3 text-center'>
                <p className="text-sm text-gray-500">
                    No tenés tu cuenta?{' '}
                    <span className="font-semibold underline cursor-pointer border-black">
                        Registrate
                    </span>
                </p>
            </div>
            </form>
        </div>
    )
}

export default Login