import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchMyHotels } from '../api-client'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'

const MyHotels = () => {

    const { data: HotelData, isSuccess, isError, error } = useQuery({
        queryFn: fetchMyHotels,
        queryKey: ['my-hotels'],
    }
    )
    useEffect(() => {
        if (isSuccess) {
            console.log(HotelData);
        }

    }, [isSuccess, HotelData])

    useEffect(() => {
        if (isError) {
            console.log(error);
        }
    }, [isError, error])



    return (
        <div className='space-y-9'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>My Hotels</h1>
                <Link to='/add-hotel' className='px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-orange-700 hover:shadow-lg active:scale-95'>Add Hotel</Link>

            </div>
            {HotelData?.length === 0 && <div className='text-center text-2xl font-medium'>No Hotels Found</div>}
            <div className='grid grid-cols-1 gap-8'>

                {HotelData?.map((hotel) => {

                    return (
                        <div key={hotel._id} className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
                            <div className='flex flex-col gap-3'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-2xl font-medium'>{hotel.name}</h2>
                                    <div className='border border-slate-300 rounded-lg shadow-lg overflow-hidden p-3 w-[100px] h-[100px]'>
                                        <img className='w-full h-full object-cover' src={hotel.imageUrls[0]} alt="images" />
                                    </div>
                                </div>
                                <div className='whitespace-pre-line'>{hotel.description} </div>

                            </div>
                            <div className='grid grid-cols-5 gap-2'>
                                <div className='border border-slate-300 rounded-sm p-3 flex justify-center gap-1 items-center max-lg:text-[10px]'>
                                    <BsMap />
                                    {hotel.city},{hotel.country}
                                </div>
                                <div className='border border-slate-300 rounded-sm p-3 flex justify-center gap-1 items-center'>
                                    <BsBuilding />
                                    {hotel.type}
                                </div>
                                <div className='border border-slate-300 rounded-sm p-3 flex justify-center gap-1 items-center'>
                                    <BiMoney />
                                    {hotel.pricePerNight} Rs/Night
                                </div>
                                <div className='border border-slate-300 rounded-sm p-3 flex justify-center gap-1 items-center'>
                                    <BiHotel />
                                    {hotel.adultCount} adults , {hotel.childCount} children
                                </div>
                                <div className='border border-slate-300 rounded-sm p-3 flex justify-center gap-1 items-center'>
                                    <BiStar />
                                    {hotel.starRating} Star
                                </div>
                            </div>
                            <div className='ml-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg active:scale-95 '>
                                <Link to={`/edit-hotel/${hotel._id}`}>View Details</Link>
                            </div>
                        </div>
                    )
                })}

            </div>

        </div>
    )
}

export default MyHotels
