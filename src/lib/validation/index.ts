import * as z from "zod";

export const SingUpValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'The given username is too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})

