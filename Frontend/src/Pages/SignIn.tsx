import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { signIn } from '../api-client'
import { useAppContext } from '../Hooks/AppContextHook'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export type SignInFormData = {
    email: string,
    password: string
}

const SignIn = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { mutate: loginMutation } = useMutation({
        mutationFn: signIn,
        onSuccess: async () => {
            //1. show toast message
            //2. navigate to the home page
            await queryClient.invalidateQueries({ queryKey: ['loginkey'] });
            showToast({
                message: "Sign In successful!",
                type: "SUCCESS"
            })
            navigate('/');
        },
        onError: () => {
            showToast({
                // message: error.message,
                message: "Invalid Credentials",
                type: "ERROR"
            })
        }

    })
    const onSubmit = (data: SignInFormData) => {
        try {
            loginMutation(data);
            reset();
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center justify-center gap-5'>
            <h2 className='text-3xl font-normal '>Sign In </h2>
            <label className='text-gray-700 text-sm font-normal w-full '>
                Email
                <input

                    className='border rounded w-full py-1 px-2 font-normal' {...register("email", {
                        required: "Email is required"
                    })} type="email" name='email' autoComplete='email'></input>
                {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </label>
            <label className='text-gray-700 text-sm font-normal w-full '>
                Password
                <input
                    type="password"
                    className='border rounded w-full py-1 px-2 font-normal' {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long"
                        }
                    })} name='password'></input>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </label>
            <div className='w-full flex justify-between items-center'>
                <span className='text-sm font-normal'>Not Registered? <Link to='/register' className='hover:underline'>Create an Account here</Link></span>
                <button
                    type='submit'
                    className='bg-blue-600 text-white font-light tracking-wider text-xl rounded-full px-8 py-2'>
                    Login
                </button>
            </div>
        </form>
    )
}

export default SignIn