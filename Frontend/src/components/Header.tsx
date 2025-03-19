
import { Link } from 'react-router-dom'
import { useAppContext } from '../Hooks/AppContextHook';
import SignOutButton from './SignOutButton';

const Header = () => {

    const { isLoggedIn } = useAppContext();


    return (
        <div
            className='bg-background-color py-6 px-16'
        >
            <div className='container mx-auto flex justify-between items-center'>
                <span
                    className='text-4xl text-white font-normal tracking-tight'
                >
                    <Link to='/'><span className='text-6xl font-medium text-blue-900' >Aasheervaad</span> Grand Stays</Link>
                </span>
                <span
                    className='flex space-x-2'
                >
                    {isLoggedIn ? (<div className='gap-2 flex items-center'>
                        <Link className='flex items-center px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-800 hover:shadow-lg active:scale-95' to='/my-bookings'>My Bookings</Link>
                        <Link className='flex items-center px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-800 hover:shadow-lg active:scale-95' to='/my-hotels'>My Hotels</Link>
                        <SignOutButton />

                    </div>) :
                        (<div><Link to='/sign-in' className='flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-green-700 hover:shadow-lg active:scale-95'>
                            Sign In
                        </Link></div>)
                    }

                </span>

            </div>
        </div>
    )
}

export default Header