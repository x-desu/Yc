import { client } from "@/sanity/lib/client"
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import markdownit from 'markdown-it'
import { Suspense } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import StartupCard, { StartupTypeCard } from "@/components/StartupCard"
import Like from "@/components/Like"
import { auth } from "@/auth"
import { toast } from "@/hooks/use-toast"

const md = markdownit()
export const experimental_ppr = true

const StartUpPage = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const session = await auth()
    const [post,{select:editorPosts}] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY,{id}),
        await client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'})
    ])
   
    if(!post) return notFound()
        console.log(post)

    const parsedContent = md.render(post?.description)

  return (
    <div>
        <section className="pink_container !min-h-[240px]">
            <p className="tag">{post?._createdAt}</p>
            <h1 className="heading">{post.title}</h1>
            <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
        
        <section className="section_container">
            <Image 
            src={post?.image}
            width={800}
            height={400}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-auto rounded-xl"
            />
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${post?.author?._id}`}
                    className="flex gap-2 items-center mb-3"
                    >
                        <Image
                        src={post.author?.image}
                        alt="avatar"
                        width={64}
                        height={64}
                        className="rounded-full drop-shadow-lg w-16 h-16 object-cover"
                        />
                        <div>
                            <p className="text-20-medium">{post.author.name}</p>
                            <p className="text-16-medium !text-black-300">@{post.author.username}</p>
                        </div>
                    </Link>

                    <p className="category-tag">
                        {post.category}
                    </p>
                </div>
                <h3 className="text-30-bold">Startup Details</h3>
                {parsedContent ? (
                    <article className="prose max-w-4xl font-work-sans break-all"
                    dangerouslySetInnerHTML={{__html:parsedContent}}
                    />
                ):<p className="no-result">
                    No details provided
                </p>}
            <div className="flex justify-end">
                <Like id={id} authorId={session?.id} />
            </div>
            </div>

            <hr className="divider"/>

            {editorPosts?.length > 0 && (
                <div className="max-w-4xl mx-auto">
                    <p className="text-30-semibold">Editor picks
                    </p>
                    <ul className="mt-7 card_grid-sm">
                        {editorPosts.map((post:StartupTypeCard,index:number)=>(
                            <StartupCard key={index} post={post}/>
                        ))}
                    </ul>
                </div>
            )}

            {/* //recommended */}
            <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                <View id={id}/>
            </Suspense>
        </section>
    </div>
  )
}

export default StartUpPage