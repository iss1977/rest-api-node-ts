import { number, object, string, TypeOf } from 'zod';


export const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Password is required'
        }).min(8,'Password should have 6 characters'),
        passwordConfirm : string({
            required_error: 'Password confirmation is required'
        }),
        email: string({
            required_error: 'Email is required'
        }).email('Email is invalid')
    })
        .refine( (data) => data.password === data.passwordConfirm, {
            message: 'Password do not match Confirm password',
            path: ['passwordConfirm']
        })
})

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>, 'body.passwordConfirm'> // password confirm 

export const deserializeUserSchema = object({
    _id: string({required_error: 'Id is required.'}),
    email: string({required_error: 'Email Address required'}).email({ message: "Invalid email address" }),
    name: string({required_error: 'Name is required'}),
    session: string({}),
});
