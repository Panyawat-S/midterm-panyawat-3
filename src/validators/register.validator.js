import { z } from 'zod'

export const loginValidator = z.object({
    username: z.string().min(4,"username must be at least 4 letters"),
    password: z.string().min(6,"password must be at least 4 letters"),
})

export const registerValidator = z.object({
    username: z.string().min(4,"username must be at least 4 letters"),
    password: z.string().min(6,"password must be at least 4 letters"),
    confirmPassword: z.string().min(6,"please confirm your password"),
})