"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useActionState } from 'react'
import * as actions from "@/action"

const createNewSnippet = () => {
    
    const [formStateData , updatedAction] = useActionState(actions.createNewSnipp,{message:""})   

  return (
    <form action={updatedAction}>
        <Label >Title</Label>
        <Input name='title' id='id'></Input>
        <Label >Code</Label>
        <Textarea name='code' id='code'></Textarea>

       {formStateData.message && <div className='border-2 border-red-600'>{formStateData.message}</div> } 

        

        <Button className='my-2' type='submit'>New </Button>
    </form>
  )
}

export default createNewSnippet