import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
const ImagesSection = () => {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()
    return (
        <div>
            <h2 className='text-2xl font-medium mb-3' >Images</h2>
            <div className='rounded ring-2 ring-blue-900 p-4 flex flex-col gap-4'>
                <input type="file"
                    className='w-full text-gray-700 font-normal'
                    multiple
                    accept="image/*"
                    {...register('imageFiles', {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length;
                            if (totalLength === 0) {
                                return "At least one image should be uploaded"
                            }
                            else if (totalLength > 6) {
                                return "Maximum 6 images are allowed"
                            }
                            else {
                                return true
                            }

                        }
                    })}
                />

            </div>
            {errors.imageFiles && (<span className='text-red-500'>{errors.imageFiles.message}</span>)}
        </div>
    )
}

export default ImagesSection