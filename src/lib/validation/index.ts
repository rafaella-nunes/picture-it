import * as z from "zod";

export const SingUpValidation = z.object({
    name: z.string().min(2, {message: 'Too short'}),
    username: z.string().min(2, {message: 'The given username is too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})

export const SingInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
})

export const PostValidation = z.object({
    caption: z.string().min(1).max(1000),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
})
