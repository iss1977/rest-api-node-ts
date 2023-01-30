import mongoose from "mongoose";
import { getUserSessionsHandler } from "../controller/session.controller";

// import { customAlphabet } from 'nanoid';
// const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
// const productId =  `product_${nanoid()}`

const userId = new mongoose.Types.ObjectId().toString();
const session = new mongoose.Types.ObjectId().toString();

export const productPayload =  {
    user: userId,
    title: 'Product title',
    description: 'Claw your carpet in places everyone can see - why hide my amazing artistic clawing skills?. If it smells like fish eat as much as you wish destroy house in 5 seconds missing until dinner time pose purrfectly to show my beauty for eat plants, meow, and throw up because i ate plants. Slap the dog because cats rule. Knock over christmas tree cough furball pelt around the house and up and down stairs chasing phantoms and am in trouble, roll over',
    price: 899.99,
    image: 'https://image.com/sample.jpg'
}

export const userPayload =  {
    _id: userId,
    email: 'testuser@testdomain.com',
    name: 'Test User',
    session
}