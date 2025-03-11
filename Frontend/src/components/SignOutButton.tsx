import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signOut } from '../api-client'
import { useAppContext } from '../Hooks/AppContextHook'

const SignOutButton = () => {
    const { showToast } = useAppContext()
    const queryClient = useQueryClient()
    const { mutate: signOutMutation } = useMutation({
        mutationFn: signOut,
        onSuccess: async () => {
            //1.show toast
            //2.navigate to the home page
            // console.log('Sign Out successful!');
            await queryClient.invalidateQueries({ queryKey: ['loginkey'] });
            showToast({
                message: "Signed Out!",
                type: "SUCCESS"
            })

        },
        onError: (error: Error) => {
            //show toast
            showToast({
                message: error.message,
                type: "ERROR"
            })
        }
    })

    const handleClick = () => {
        try {
            signOutMutation();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <button
            onClick={handleClick}
            className=' items-center bg-blue-600 font-light leading-normal text-white rounded-full px-6 py-2'
        >Sign Out</button>
    )
}

export default SignOutButton