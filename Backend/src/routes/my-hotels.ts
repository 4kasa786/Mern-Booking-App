import express, { Request, Response } from 'express';
import cloudinary from 'cloudinary';
const router = express.Router();
import multer from 'multer';
import Hotel from '../models/hotel';
import { HotelType } from '../Shared/types';
import verifyToken from '../middleware/auth';
import { z } from 'zod';


const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB is the maximum size of the file that can be uploaded.

    }

})


const newHotelSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.string().min(1, { message: "Hotel type is required" }),
    pricePerNight: z
        .string()
        .min(1, { message: "Price per night is required" })
        .refine((val) => !isNaN(Number(val)), {
            message: "Price per night must be a number",
        }),
    facilities: z
        .array(z.string().min(1))
        .min(1, { message: "Facilities are required" }),
});

const validateHotel = (req: Request, res: Response, next: Function) => {
    try {
        const parsedData = {
            name: req.body.name || "",
            city: req.body.city || "",
            country: req.body.country || "",
            description: req.body.description || "",
            type: req.body.type || "",
            pricePerNight: req.body.pricePerNight || "", // Keep as string since frontend is sending string
            facilities: Array.isArray(req.body.facilities)
                ? req.body.facilities
                : (typeof req.body.facilities === 'string'
                    ? JSON.parse(req.body.facilities)
                    : []),
        };

        console.log(parsedData);

        const result = newHotelSchema.safeParse(parsedData);
        if (!result.success) {
            res.status(400).json({ message: result.error.errors });
            return;
        }
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid input data" });
        return;
    }
}
interface CustomRequest extends Request {
    userId?: string,
}

router.post('/', verifyToken, upload.array('imageFiles', 6), validateHotel, async (req: CustomRequest, res: Response) => {
    try {
        const imageFiles = req.files as Express.Multer.File[]; //this means that the imageFiles is an array of files.
        const newHotel: HotelType = req.body;


        //1)upload the images to cloudinary
        //2)if upload was successfull , and the urls to the new hotel
        //3)save the new hotel to the database
        //4)return at 201 status

        const uploadPromises = imageFiles.map(async (image) => {
            //in map data is processing parallely thats why uploadPromises is an array of promises,if we have used the for loop then it would have been an array of urls.
            const b64 = Buffer.from(image.buffer).toString('base64');
            console.log(b64);
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            console.log(dataURI);
            const result = await cloudinary.v2.uploader.upload(dataURI);
            console.log(result);
            return result.url;
        })

        const imageUrls = await Promise.all(uploadPromises); //this will wait for all the promises to resolve and then return the urls.
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date(); //this will add the current date to the lastUpdated field of the newHotel object.
        newHotel.userId = req.userId as string; //this will add the userId to the newHotel object.

        const hotel = new Hotel(newHotel);
        await hotel.save();
        console.log(hotel);
        res.status(201).json({ message: "Hotel created successfully" });

    }
    catch (err) {
        console.log("Error creating hotel: ", err);
        res.status(500).json({ message: 'Something went wrong ' });

    }
})

router.get('/', verifyToken, async (req: CustomRequest, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.status(200).json({ hotels });
    }
    catch (err) {
        res.status(500).json({ message: "Error fetching the hotels" });
    }
})


export default router;