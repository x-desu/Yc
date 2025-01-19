'use client'
import { Input } from "@/components/ui/input"
import { useActionState, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import {z} from 'zod'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation";
import createPitch from "@/lib/actions";

const StartupForm = () => {
    const [errors,setErrors] = useState<Record<string,string>>({})
    const [pitch, setPitch] = useState("");
    const { toast } = useToast()
    const router = useRouter()


    const handleFormSubmit = async(prevState,Formdata) => {
        try {
            const formValues = {
                title: Formdata.get("title") as string,
                description: Formdata.get("description") as string,
                category: Formdata.get("category") as string,
                link: Formdata.get("link") as string,
                pitch
            }

            await formSchema.parseAsync(formValues)
            
            const result = await createPitch(prevState,formValues,pitch)
          
            if(result.status == "SUCCESS"){
                toast({
                    title: "Success",
                    description: "Your startup pitch has been created",
                    className:'bg-primary text-white text-2xl font-bold rounded-lg'
                  })
                  router.push(`/startup/${result._id}`)
            }
            return result
        } catch (error) {      
            if(error instanceof z.ZodError){
                const fieldErrors = error.flatten().fieldErrors
                setErrors(fieldErrors as unknown as Record<string, string>)
                toast({
                    title: "Form error",
                    description: "Invalid inputs",
                    variant:'destructive',
                    className:'bg-primary text-white text-2xl font-bold rounded-lg border-2 border-black'
                  })
                return {...prevState, error: 'Validation failed',status:"ERROR"}
            }
            toast({
                title: "error",
                description: ":(",
                variant:'destructive'
              })
            return {...prevState, error: 'Error occured in form',status:"ERROR"}
        } finally{

        }

    }

    const [state,formAction,isPending] = useActionState(handleFormSubmit,{
        error:"",
        status:"INITIAL"
    })

  return (
    <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input name="title" id="title" className="startup-form_input" placeholder="Startup Title"/>

            {errors.title && <p className="startup-form_error">{errors?.title}</p>}
        </div>
        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea name="description" id="description" className="startup-form_textarea" required placeholder="Startup Description"/>

            {errors.description && <p className="startup-form_error">{errors?.description}</p>}
        </div>
        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input name="category" id="category" className="startup-form_input" placeholder="Startup Category (Tech, Health, Education...)"/>

            {errors.category && <p className="startup-form_error">{errors?.category}</p>}
        </div>
        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input name="link" id="link" className="startup-form_input" placeholder="Startup Image url"/>

            {errors.link && <p className="startup-form_error">{errors?.link}</p>}
        </div>
        <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
      <MDEditor
        value={pitch}
        onChange={(e)=>setPitch(e)}
        id="pitch"
        preview="edit"
        height={300}
        style={{borderRadius:20,overflow:"hidden"}}
        textareaProps={{
            placeholder:"Pitch your startup here!"
        }}
        previewOptions={{
            disallowedElements:["style"]
        }}
      />
      {errors.pitch && <p className="startup-form_error">{errors?.pitch}</p>}
    </div>
    <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending?"Submitting...":"Submit Your Pitch"}
        <Send className="size-6 ml-2"/>
    </Button>
    </form>
  )
}

export default StartupForm