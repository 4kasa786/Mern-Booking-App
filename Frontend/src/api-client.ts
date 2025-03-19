import { RegisterFormData } from "./Pages/Register";
import { SignInFormData } from './Pages/SignIn'
import { HotelType } from '../../Backend/src/Shared/types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; //in vite we can access the environment variables using import.meta.env.VITE_VARIABLE_NAME

export const register = async (formData: RegisterFormData) => {

    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: 'include', //this is used to tell the browser to include the cookies in the request
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)//this is used to convert the form data into json format
    })
    const responseBody = await response.json(); //this will convert the response into json format
    if (!response.ok) {
        throw new Error(responseBody.message);
    }

}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {


        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }


}

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: "GET",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },

    })
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
    else {
        console.log(responseBody.userId);
        return responseBody
    }
}

export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }

    })
    const responseBody = await response.json();
    if (!response.ok) {
        throw new Error(responseBody.message);
    }
}
export const addMyHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData
    })
    if (!response.ok) {
        throw new Error("Error while adding the hotel");
    }
    return response.json();
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'GET',
        credentials: 'include',

    })
    if (!response.ok) {
        throw new Error("Error while fetching the hotels");
    }
    const responseBody = await response.json();

    return responseBody.hotels;

}