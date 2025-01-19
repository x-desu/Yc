import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"
import StartupCard, {StartupTypeCard} from '@/components/StartupCard'

const UserStartups = async({id}:{id:string}) => {

    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id})
    console.log(startups)
  return (
    <>
    {startups.length>0? startups.map((startup:StartupTypeCard)=>(
         <StartupCard post={startup} key={startup._id} />  
    )):<p className="no-result">
        No posts
        </p>}
    </>
  )
}

export default UserStartups