import {z} from 'zod'

export const formSchema = z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z.string().url("Please provide a valid URL").refine(async(url)=>{
        try {
            const response = await fetch(`/api/validate-image?url=${encodeURIComponent(url)}`);
            const { isValid } = await response.json();
            return isValid; 
          } catch(error){
            // Return false if fetching or validation fails
            console.error('Error validating image URL:', error);
            return false;
          }
    },{
        message:'Provided URL is not a valid image.',
    }
),
    pitch: z.string().min(10)
})