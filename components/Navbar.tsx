import { auth, signIn, signOut } from "@/auth"
import { Badge, BadgePlus, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Image from "next/image"
import Link from "next/link"


const Navbar = async() => {
    const session = await auth()
    
  return (
    <header className="py-3 px-5 dark:bg-neutral-900 bg-white shadow-sm font-work-sans">

    <nav className="flex justify-between items-center">
       
        <Link href={"/"}>
        <Image src="/logo.png" alt="YC logo"
        width={144}
        height={30}
        quality={75} 
        priority={true} 
        placeholder = 'empty'
        />
        </Link>
        
        <ul className="flex items-center gap-5 ">
            {session && session?.user ?(
                <>
            <Link href={"/startup/create"}>
                <button className="font-semibold font-work-sans "><span className="max-sm:hidden ">Create</span>
                <BadgePlus className="size-6 sm:hidden"/>
                </button>
            </Link>
            <li>
            <form action={async()=>{
                'use server'

               await signOut()
            }}>
                 <button className="font-semibold text-red-500" type="submit"><span className="max-sm:hidden ">Logout</span>
                 <LogOut className="size-6 sm:hidden text-red-500"/>
                 </button>
            </form>
            </li>
            <Link href={`/user/${session?.id}`}>
            {/* <Image src={`${session?.user?.image}`} alt="YC logo"
            width={144}
            height={30}
            quality={75} 
            priority={true} 
            placeholder = 'empty'
            /> */}
            <span className="max-sm:hidden">{session?.user?.name}</span>
            <Avatar className="sm:hidden size-10">
                <AvatarImage src={session?.user?.image} alt={session?.user?.name || ""}/>
                <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            </Link>
            </> 
            ):(
                <>
                {/* <Link href={"/startup/create"}>
                    <button className="font-semibold">Create</button>
                </Link> */}
                <li>
                <form action={async()=>{
                    'use server'
                    await signIn()
                }} >
                    <button className="font-semibold text-red-500" type="submit">Login</button>
                </form>
                </li>
                {/* <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
                </Link> */}
                </> 
            )
            }
        </ul>
    </nav>
        </header>
  )
}

export default Navbar