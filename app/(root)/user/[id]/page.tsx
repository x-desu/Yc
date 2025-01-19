import { auth } from "@/auth"
import { StartupCardSkeleton } from "@/components/StartupCard"
import { Skeleton } from "@/components/ui/skeleton"
import UserStartups from "@/components/UserStartups"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

export const experimental_ppr = true

const UserPage = async({params}:Promise<{id:string}>) => {
    const {id} = await params
    const session = await auth()

    const user = await client.fetch(AUTHOR_BY_ID_QUERY,{id})
    if(!user) return notFound()
    
  return (
    <>
    <section className="profile_container">
        <div className="profile_card">
            <div className="profile_title">
                <h3 className="text-24-black uppercase text-center line-clamp-1">
                    {user.name}
                </h3>
            </div>
            <Image 
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
            />
            <p className="text-30-extrabold mt-7 text-center">
                @{user?.username}
            </p>
            <p className="text-center mt-1 text-14-normal">
                {user?.bio}
            </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
            <p className="text-30-bold">
                {session?.id === id ? "Your" : "All"} Startups
            </p>
            <ul className="card_grid-sm">
                <Suspense fallback={<StartupCardSkeleton/>}>
                <UserStartups id={id}/>
                </Suspense>
            </ul>
        </div>
    </section>
    </>
  )
}

export default UserPage