
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
const GuestSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()
    return (
        <div className=''>
            <h2 className='text-2xl font-medium text-gray-700 mb-3'>Guests</h2>
            <div className='grid grid-cols-2 gap-5 p-6 bg-gray-300 ring-2 ring-blue-900 rounded place-items-center ' >
                <label className='text-gray-700 text-sm font-medium w-full'>
                    Adults
                    <input type="number"
                        className='rounded ring-2 ring-blue-900 w-full outline-none font-normal '
                        min={1}
                        {...register('adultCount', { required: "At least one adult is required" })}
                    />

                    {errors.adultCount && (<span className='text-red-500'>{errors.adultCount.message}</span>)}
                </label>
                <label className='text-gray-700 text-sm font-medium w-full'>
                    Children
                    <input type="number"
                        className='rounded ring-2 ring-blue-900 w-full outline-none font-normal'
                        min={0}
                        {...register('childCount', { required: "This Field is required" })}
                    />

                    {errors.childCount && (<span className='text-red-500'>{errors.childCount.message}</span>)}
                </label>


            </div>

        </div>
    )
}

export default GuestSection