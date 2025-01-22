import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/writeclient";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(request:NextRequest){
    const reqbody = await request.json()
    const { authorId, startupId, action } = reqbody
    const startup = await client.fetch(STARTUP_BY_ID_QUERY,{id:startupId})

     try {
        if(action){
           if (!startup.likes?.some((like) => like._ref === authorId)) {
              const respone = await writeClient
                 .patch(startupId)  // Use the _id from the startup object
                 .setIfMissing({ likes: [] })
                 .append('likes', [{ _ref: authorId, _type: 'reference' }])
                 .commit();
             }
        } else{
           await writeClient
             .patch(startupId)
             .unset([`likes[_ref=="${authorId}"]`])
             .commit();
        }  
        return NextResponse.json({message:action?"Liked":"Unliked"})
     } catch (error:any) {
        console.error('Error updating document:', error);
        return NextResponse.json({error: error || 'Error updating like' },{status:500})
     }

   
}