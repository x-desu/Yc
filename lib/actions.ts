'use server'

import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/writeclient"
import slugify from 'slugify'

const createPitch = async(state,form,pitch) => {
 const session = await auth()
 if(!session){
    return JSON.parse(JSON.stringify({error:"Not signed in"}))
 }


 const {title,description,category,link} = Object.fromEntries(Array.from(Object.entries(form)).filter(([key]) => key !== "pitch"))
 const slug = slugify(title,{lower:true,strict:true})

 try {
    const startup = {
        title,
        description,
        category,
        image:link,
        slug:{
            _type:slug,
            current:slug
        },
        author:{
        _type:'reference',
        _ref: session?.id
        },
        pitch
    }

    const result = await writeClient.create({_type:'startup',...startup})
    return JSON.parse(JSON.stringify({
        ...result,
        error:'',
        status:"SUCCESS"
    }))
 } catch (error) {
    console.log(error)

    return JSON.parse(JSON.stringify({error:error,status:"ERROR"}))
 }
}

export default createPitch