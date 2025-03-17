

import ManageHotelForm from '../forms/ManageHotelForms/ManageHotelForm'
import { useMutation } from '@tanstack/react-query'
import { addMyHotel } from '../api-client'
import { useAppContext } from '../Hooks/AppContextHook'


const AddHotel = () => {
    const { showToast } = useAppContext()

    const { mutate: addHotelMutation, isPending } = useMutation({
        mutationFn: addMyHotel,
        onSuccess: () => {
            //1.show toast message
            showToast({ message: "Hotel added successfully", type: "SUCCESS" })
        },
        onError: () => {
            showToast({ message: "Error while adding the hotel", type: "ERROR" })
        }

    })

    const handleSave = (hotelFormData: FormData) => {
        try {
            addHotelMutation(hotelFormData)
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <ManageHotelForm onSave={handleSave} isPending={isPending} />
    )
}

export default AddHotel