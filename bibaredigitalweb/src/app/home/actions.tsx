"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function addData(formdata: FormData) {
    const supabase = await createClient();

    const data = {
        chorale: formdata.get("chorale") as string,
        uwabikoze: formdata.get("uwabikoze") as string,
        ahobagiye: formdata.get("ahobagiye") as string,
        itariki: formdata.get("itariki") as string,
        umwanzuro:false
        
    }
    const { error } = await supabase.from('ubutumire')
        .insert({
            chorale: data.chorale,
            uwabikoze: data.uwabikoze,
            ahobagiye: data.ahobagiye,
            itariki: data.itariki,
            umwanzuro: data.umwanzuro
        });

    if (error) {
        redirect("/error");
    }
    
}