import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { SingUpValidation } from "@/lib/validation";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations";


const SignUpForm = () => {
  const { toast } = useToast();

  const { mutateAsync: createUserAccount, isLoading: isCreatingUser} = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningIn} = useSignInAccount();

   // 1. Define form.
   const form = useForm<z.infer<typeof SingUpValidation>>({
    resolver: zodResolver(SingUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SingUpValidation>) {
    const newUser = await createUserAccount(values);
    
    if(!newUser) {
      return toast({ title: "Sing up failed. Please try again." });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if(!session){
      return toast({ title: "Sing in failed. Please try again." }); 
    }

    
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/public/assets/images/logo.svg" alt="Snapgram"/>

        <h2 className="h3-bold md:h2-bold pt-4 sm:pt-12">Create a new account.</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use SnapGram, please enter your details.</p>

      { /* form start */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

        <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="username" render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="shad-button_primary">
          
          {isCreatingUser ? (
            <div className="flex-center gap-2">
              <Loader />
            </div>
          ): "Sign Up"}
        </Button>

        <p className="text-small-regular text-light-2 text-center mt-2">
          Already have an account? 
          <Link to="/sing-in" className="text-primary-500 text-dash-small-semibold ml-1">Log In</Link>
        </p>
      </form>
      </div>


    </Form>
  )
}

export default SignUpForm