import { hotelTypes } from '../../config/hotel-options-config';
import { HotelFormData } from './ManageHotelForm';

import { useFormContext } from 'react-hook-form';

const TypesSection = () => {
    const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
    const typeWatch = watch('type');

    return (
        <div className=''>
            <h2
                className='text-2xl font-semibold text-gray-700 mb-3'
            >Type</h2>
            <div className='grid grid-cols-5 gap-2'>
                {hotelTypes.map((type, index) => {
                    return (<label key={index}
                        className={typeWatch === type ? 'cursor-pointer bg-blue-300 text-sm font-normal rounded-full px-4 py-2  ring-blue-900 ring-2  '
                            : 'cursor-pointer bg-gray-300 text-sm font-normal rounded-full px-4 py-2  ring-blue-900 ring-2 '}
                    >
                        <input
                            className='hidden'
                            type="radio" value={type}
                            {...register("type", { required: "Type is required" })}
                        ></input>
                        <span>
                            {type}
                        </span>
                    </label>)
                })}
            </div>
            {errors.type && <span
                className='text-red-500 '
            >{errors.type.message}</span>}
        </div>
    )
}

export default TypesSection