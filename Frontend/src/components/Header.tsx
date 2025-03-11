
import { Link } from 'react-router-dom'
import { useAppContext } from '../Hooks/AppContextHook';
import SignOutButton from './SignOutButton';

const Header = () => {

    const { isLoggedIn } = useAppContext();


    return (
        <div
            className='bg-background-color py-6 px-16'
        >
            <div className='container mx-auto flex justify-between'>
                <span
                    className='text-4xl text-white font-normal tracking-tight'
                >
                    <Link to='/'><span className='text-blue-700' >Aasheervaad</span> Grand Stays</Link>
                </span>
                <span
                    className='flex space-x-2'
                >
                    {isLoggedIn ? (<div className='gap-2 flex items-center'>
                        <Link className='flex items-center bg-blue-600 font-light leading-normal text-white rounded-full px-6 py-2' to='/my-bookings'>My Bookings</Link>
                        <Link className='flex items-center bg-blue-600 font-light leading-normal text-white rounded-full px-6 py-2' to='/my-hotels'>My Hotels</Link>
                        <SignOutButton />

                    </div>) :
                        (<Link to='/sign-in' className='flex items-center bg-blue-600 font-light leading-normal text-white rounded-full px-6 py-2 '>
                            Sign In
                        </Link>)
                    }

                </span>

            </div>
        </div>
    )
}

export default Header