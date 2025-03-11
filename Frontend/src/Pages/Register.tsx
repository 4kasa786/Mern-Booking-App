import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../Hooks/AppContextHook';
import { useNavigate } from 'react-router-dom';

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Register = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    });

    const { mutate: registerMutate } = useMutation({
        mutationFn: apiClient.register,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['loginkey'] });

            showToast({
                message: "User registered successfully",
                type: "SUCCESS"
            }),
                navigate('/');
        },

        onError: (error: Error) => { //here Error is the type of the error object which we have defined in the api-client.ts file
            showToast({
                message: error.message,
                type: "ERROR"
            })
        }

    })

    const onSubmit = (data: RegisterFormData) => {
        try {
            registerMutate(data);
            reset(); //this will reset the form after submission
        }
        catch (err) {
            console.log(err);
        }
    }



    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-5 items-center'
        >
            <h2
                className='text-3xl font-normal'
            >Create an Account</h2>

            <div
                className='flex flex-col md:flex-row gap-5 w-full'
            >
                <label className='text-gray-700 text-sm font-normal flex-1 '>
                    First Name
                    <input
                        className='border rounded w-full py-1 px-2 font-normal ' {...register("firstName", {
                            required: "First Name is required"
                        })} name='firstName'></input>
                    {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
                </label>

                <label className='text-gray-700 text-sm font-normal flex-1 '>
                    Last Name
                    <input className='border rounded w-full py-1 px-2 font-normal' {...register("lastName", {
                        required: "Last Name is required"
                    })} name='lastName'></input>
                    {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
                </label>
            </div>
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
            <label className='text-gray-700 text-sm font-normal w-full '>
                Confirm Password
                <input
                    type="password"
                    className='border rounded w-full py-1 px-2 font-normal' {...register("confirmPassword", {
                        validate: (val) => {
                            if (!val) {
                                return "This field is required"
                            }
                            else if (watch('password') !== val) {
                                return "Password does not match"
                            }
                        }
                    })} name='confirmPassword'></input>
                {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
            </label>
            <div >
                <button
                    type='submit'
                    className='bg-blue-600 text-white font-light tracking-wider text-xl rounded-full px-8 py-2'>
                    Create Account
                </button>
            </div>
        </form>
    )
}

export default Register