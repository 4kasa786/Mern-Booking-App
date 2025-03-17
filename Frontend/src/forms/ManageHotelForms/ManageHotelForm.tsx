

import { FormProvider, useForm } from 'react-hook-form'
import DetailsSection from './DetailsSection';
import TypesSection from './TypesSection';
import FacilitiesSection from './FacilitiesSection';
import GuestSection from './GuestSection';
import ImagesSection from './ImagesSection';

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;

}

type Props = {
    onSave: (hotelFormData: FormData) => void,
    isPending: boolean
}

const ManageHotelForm = ({ onSave, isPending }: Props) => {

    const formMethods = useForm<HotelFormData>()

    const { handleSubmit } = formMethods

    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        //create a new FormData object and call the api to save the data    
        // console.log(formData);
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });



        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });


        onSave(formData);


    })

    return (
        <FormProvider {...formMethods}>
            <form className='flex flex-col gap-10' onSubmit={onSubmit} >
                <DetailsSection />
                <TypesSection />
                <FacilitiesSection />
                <GuestSection />
                <ImagesSection />
                <div className='flex justify-center'>
                    <button type='submit'
                        disabled={isPending ? true : false}
                        className='bg-blue-600 text-white font-light rounded-full px-6 py-2 tracking-wider text-xl disabled:bg-gray-500'>
                        {isPending ? 'Saving...' : 'Save'}
                    </button>
                </div>

            </form>
        </FormProvider >

    )
}

export default ManageHotelForm