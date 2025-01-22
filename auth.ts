import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_OAUTH_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/writeclient"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub,Google],
  theme:{
    colorScheme: "dark", // "auto" | "dark" | "light"
    brandColor: "#ee2b69", // Hex color code
    logo: "/logo.png", // Absolute URL to image
    buttonText: "Sign in" // Hex color code
  },
  callbacks:{
    async signIn({ user, profile  }){
      
      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_OAUTH_ID_QUERY,
        {id:profile?.id}
      )
      if(!existingUser){
        await writeClient.create({
          _type:"author",
          id:profile?.id,
          name:user?.name,
          username:profile?.login,
          email:user?.email,
          image:user?.image,
          bio:profile?.bio || ""
        })
      }
      return true
    },
    async jwt({token,account,profile}){
        if(account && profile){
            const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_OAUTH_ID_QUERY,
              {id:profile?.id}
            )
            
            if (user) {
              token.id = user?._id;
          }
        }
        return token
    },
  async session({session,token}){
    
    Object.assign(session,{id:token.id})
  
    return session
  }
        
  }
})