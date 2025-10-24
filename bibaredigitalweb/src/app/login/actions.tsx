"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      message:error.message|| "Habayeho Ikosa Muginjira",
      
   }
  }
  

  revalidatePath("/", "layout");
  redirect("/home");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // here , let em use type-casting here for convenience
  
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      success: false,
      message:error.message|| "Habayeho Ikosa Mugukora Konti",

    }
  }

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Konti Yawe Yakozwe Neza",


    
  }

  
}


