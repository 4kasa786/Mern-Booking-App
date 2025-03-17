

import { hotelFacilities } from '../../config/hotel-options-config'
import { HotelFormData } from './ManageHotelForm'
import { useFormContext } from 'react-hook-form'

const FacilitiesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className='text-2xl text-gray-700 font-medium mb-3' >Facilities</h2>
            <div className='grid grid-cols-4 gap-3'>
                {hotelFacilities.map((facility, index) => {
                    return (
                        <label key={index}
                            className='text-sm flex gap-1 text-gray-700'
                        >
                            <input
                                type='checkbox'
                                value={facility}
                                {...register('facilities', {
                                    validate: (facilities) => {
                                        if (facilities && facilities.length > 0) {
                                            return true
                                        }
                                        else {
                                            return "At least one Facility is required"
                                        }
                                    }

                                })}

                            >
                            </input>
                            {facility}

                        </label>
                    )
                })}
            </div>
            {errors.facilities && (<span className='text-red-500'>
                {errors.facilities.message}
            </span>)}
        </div>
    )
}

export default FacilitiesSection