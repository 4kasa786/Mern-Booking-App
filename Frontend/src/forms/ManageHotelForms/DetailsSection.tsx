
import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const DetailsSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>();
    return (
        <div
            className='flex flex-col gap-4'
        >
            <h1 className='text-5xl font-normal mb-3 text-center '>Add Hotel</h1>
            <label className='text-gray-700 text-sm font-normal w-full '>
                Name
                <input

                    className='border rounded w-full py-1 px-2 font-normal ring-blue-900 ring-2 outline-none' {...register("name", {
                        required: "Name is required"
                    })} type="text" name='name' ></input>
                {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
            </label>
            <div className='flex gap-4'>
                <label className='text-gray-700 text-sm font-normal w-full '>
                    City
                    <input

                        className='border rounded w-full py-1 px-2 font-normal ring-blue-900 ring-2 outline-none' {...register("city", {
                            required: "City is required"
                        })} type="text" name='city' ></input>
                    {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
                </label>
                <label className='text-gray-700 text-sm font-normal w-full '>
                    Country
                    <input

                        className='border rounded w-full py-1 px-2 font-normal ring-blue-900 ring-2 outline-none' {...register("country", {
                            required: "Country is required"
                        })} type="text" name='country' ></input>
                    {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
                </label>
            </div>
            <label className='text-gray-700 text-sm font-normal w-full '>
                Description
                <textarea
                    rows={10}
                    className='border rounded w-full py-1 px-2 font-normal ring-blue-900 ring-2 outline-none' {...register("description", {
                        required: "Description is required"
                    })} name='description' ></textarea>
                {errors.city && <span className='text-red-500'>{errors.city.message}</span>}
            </label>
            <label className='text-gray-700 text-sm font-normal max-w-[50%]'>
                Price Per Night
                <input
                    min={1}
                    type='number'
                    className='border rounded w-full py-1 px-2 font-normal ring-blue-900 ring-2 outline-none' {...register("pricePerNight", {
                        required: "Price Per Night is required"
                    })} name='pricePerNight' ></input>
                {errors.pricePerNight && <span className='text-red-500'>{errors.pricePerNight.message}</span>}
            </label>
            <label className='text-gray-700 text-sm font-normal max-w-[50%] '>
                Star Rating
                <br></br>
                <select
                    className=' ring-blue-900 ring-2 outline-none w-full rounded'
                    {...register('starRating', { required: "Star Rating is required" })}>
                    <option value='' key={0} className='text-sm font-light'>Select as Rating</option>
                    {[1, 2, 3, 4, 5].map((num) => {
                        return (<option value={num} key={num} className='text-sm font-light'>
                            {num}
                        </option>)
                    })}
                </select>
                {errors.starRating && <span className='text-red-500'>{errors.starRating.message}</span>}
            </label>
        </div>

    )
}

export default DetailsSection