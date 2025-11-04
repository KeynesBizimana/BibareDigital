"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs,since i am forcg data type here
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {data:authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      message:error.message|| "Habayeho Ikosa Muginjira",
      
   }
  }
  
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("userId", authData.user?.id)
    .single();
  if (userError) {
    return {
      success: false,
      message:userError.message|| "Habayeho Ikosa  mukubona amakuru yawe muri users",

    }
    
  }
  
  revalidatePath("/", "layout");
  return {
    success: true,
    message: "Winjiye Neza",
    role: userData.role,
    shouldRedirect: true,
    redirectTo: "/home",
  };
  
}

export async function signup(formData: FormData) {

 
  const supabase = await createClient();

  // here , let em use type-casting here for convenience
  
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {data:authData,error:authError } = await supabase.auth.signUp(data);

  if (authError) {
    return {
      success: false,
      message:authError.message|| "Habayeho Ikosa Mugukora Konti",

    }
  }

  if (authData.user) {
    const { error: insertError } = await supabase.from('users').insert({
      userId: authData.user.id,
      role: 'client',
      email:authData.user.email
      
    })
    if (insertError) {
      console.log("Insert error%%%%%%%%%%%%%:", insertError);
      return {
        success: false,
        message:insertError.message|| "Habayeho Ikosa Mugukora Konti",
      }
    }
    
  }
  

    revalidatePath("/", "layout");
    return {
      success: true,
      message: "Konti Yawe Yakozwe Neza",


    
  }

  
}


