import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { writeClient } from "@/sanity/lib/writeclient"
import { after } from 'next/server'

const View = async({id}:{id:string}) => {

    const {views:totalViews} = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id})

    after(async()=>{
       await writeClient.patch(id)
        .set({views:totalViews+1})
        .commit()
    }) 
    
    const handleViews = () => {
        if (totalViews && !isNaN(Number(totalViews))) {
            const view = Number(totalViews) / 10 >= 1 ? "views" : "view";
            return view;
        }
        return "view";
    }
    const view = handleViews()

  return (
    <div className="view-container">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>
        <p className="view-text">
            <span className="font-black">
                {totalViews} <span className="font-medium">{view}</span>
            </span>
        </p>
    </div>
  )
}

export default View