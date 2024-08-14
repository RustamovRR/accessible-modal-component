import { IAddExperienceForm } from '@/types'
import { delay } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z, ZodType } from 'zod'

const initialState: Partial<IAddExperienceForm> = {
  title: '',
  company: '',
  website: '',
  location: '',
  employment: '',
  description: '',
}

const useAddExperienceForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const schema: ZodType<Partial<IAddExperienceForm>> = z.object({
    title: z.string().min(3, 'Title is required'),
    company: z.string().min(3, 'Company is required'),
    website: z.string().min(3, 'Website is required'),
    location: z.string().min(3, 'Location is required'),
    employment: z.string().optional(),
    description: z.string().optional(),
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddExperienceForm>({
    defaultValues: initialState,
    resolver: zodResolver(schema),
  })

  const onSubmit: SubmitHandler<Partial<IAddExperienceForm>> = async (fields) => {
    try {
      setIsLoading(true)
      const addPromise = delay(500)

      await toast.promise(addPromise, {
        loading: 'Adding experience...',
        success: 'Experience added successfully!',
        error: "Experience didn't add. Something went wrong!",
      })

      reset()
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong!')
    }
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    errors,
    control,
    reset,
    isLoading,
  }
}

export default useAddExperienceForm
