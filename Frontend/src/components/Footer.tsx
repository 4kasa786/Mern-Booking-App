

const Footer = () => {
    return (
        <div
            className='bg-background-color py-10 mt-auto'
        >
            <div
                className='container mx-auto flex justify-between items-center '
            >
                <p className='text-4xl font-light text-white tracking-tight'><span className='text-blue-700'>Aasheervaad.com</span></p>
                <div
                    className='text-white font-light tracking-tight flex gap-4 text-lg'
                >
                    <p
                        className='cursor-pointer'
                    >Privacy Policy</p>
                    <p
                        className='cursor-pointer       '
                    >Terms of Service</p>

                </div>
            </div>
        </div>
    )
}

export default Footer