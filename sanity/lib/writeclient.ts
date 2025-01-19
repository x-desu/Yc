import 'server-only'

import {createClient} from '@sanity/client'

import { apiVersion, dataset, projectId,token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  token: token // Must have write access
})

if(!writeClient.config().token){
    throw new Error("Write token not found")
}