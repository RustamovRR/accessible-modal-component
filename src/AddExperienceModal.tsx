import { SaveIcon } from '@/assets/icons'
import { Button, Input, Modal, Select, Spinner, Textarea } from '@/components/ui'
import { useAddExperienceForm } from '@/hooks'
import { FC, useEffect, useRef } from 'react'
import { Controller } from 'react-hook-form'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const AddExperienceModal: FC<Props> = ({ isOpen, setIsOpen }) => {
  const firstInputRef = useRef<HTMLInputElement>(null)

  const { handleSubmit, errors, control, isLoading } = useAddExperienceForm()

  useEffect(() => {
    if (isOpen) {
      firstInputRef.current?.focus()
    }
  }, [isOpen])

  function handleClose() {
    setIsOpen(false)
  }

  const options = [
    {
      img: 'https://randomuser.me/api/portraits/men/29.jpg',
      label: 'Phoenix Baker',
      smallLabel: '@olivia',
      value: 'Phoenix1213',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/30.jpg',
      label: 'Lana Steiner',
      smallLabel: '@lana',
      value: 'Lanaasdf',
    },
    {
      img: 'https://randomuser.me/api/portraits/men/31.jpg',
      label: 'Qlkasdjfakl asdfasdf',
      smallLabel: '@olivia',
      value: 'alksdfjkljs',
    },
  ]

  return (
    <Modal
      open={isOpen}
      title="Add experience"
      titleSecondary="Share where you’ve worked on your profile."
      onClose={handleClose}
      containerClassName="w-lg max-h-xl max-lg:w-[90%]"
    >
      <form onSubmit={handleSubmit} aria-label="Add Experience Form">
        <div className="flex flex-col gap-4">
          <section>
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  tabIndex={-1}
                  id="title"
                  className="mt-1"
                  placeholder="What is your title?"
                  error={errors?.title?.message}
                  aria-invalid={!!errors?.title}
                  aria-required="true"
                />
              )}
            />
          </section>

          <section className="flex justify-between gap-4 max-sm:flex-col">
            <div className="w-1/2 max-sm:w-full">
              <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-700">
                Company
              </label>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    tabIndex={0}
                    isMulti
                    options={options}
                    error={errors?.company?.message}
                    placeholder="Search for company"
                    aria-invalid={!!errors?.company}
                    aria-required="true"
                  />
                )}
              />
            </div>
            <div className="w-1/2 max-sm:w-full">
              <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-700">
                Website
              </label>
              <Controller
                name="website"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="website"
                    tabIndex={1}
                    addonBefore="https://"
                    error={errors?.website?.message}
                    placeholder="www.example.com"
                    aria-invalid={!!errors?.website}
                    aria-required="true"
                  />
                )}
              />
            </div>
          </section>

          <section className="flex gap-4 max-sm:flex-col">
            <div className="w-1/2 max-sm:w-full">
              <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-700">
                Location
              </label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isSearchable
                    tabIndex={2}
                    options={options}
                    error={errors?.location?.message}
                    placeholder="Search for city"
                    aria-invalid={!!errors?.location}
                    aria-required="true"
                  />
                )}
              />
            </div>

            <div className="w-1/3 max-sm:w-full">
              <label htmlFor="employment" className="block mb-2 text-sm font-medium text-gray-700">
                Employment
              </label>
              <Controller
                name="employment"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    isSearchable
                    tabIndex={3}
                    placeholder="Employment"
                    options={options}
                    error={errors?.employment?.message}
                    aria-invalid={!!errors?.employment}
                    aria-required="false"
                  />
                )}
              />
            </div>
          </section>

          <section>
            <div>
              <label htmlFor="title2" className="text-sm font-medium text-gray-700">
                Title 2
              </label>
              <Controller
                name="title2"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="title2"
                    className="mt-1"
                    tabIndex={4}
                    placeholder="What is your title?"
                    error={errors?.title2?.message}
                    aria-invalid={!!errors?.title2}
                    aria-required="false"
                  />
                )}
              />
            </div>
          </section>

          <section>
            <div>
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    id="description"
                    className="mt-1"
                    rows={4}
                    tabIndex={5}
                    placeholder="e.g. I joined Stripe’s Customer Success team to help them scale their checkout product. I focused mainly on onboarding new customers and resolving complaints."
                    aria-invalid={!!errors?.description}
                    aria-required="false"
                  />
                )}
              />
            </div>
          </section>
        </div>

        <section className="flex items-center justify-center gap-2 mb-2 sm:hidden">
          <button className="w-2.5 h-2.5 rounded-full bg-brand-600" aria-label="Slide 1"></button>
          <button className="w-2.5 h-2.5 rounded-full bg-gray-200" aria-label="Slide 2"></button>
        </section>

        <footer className="flex justify-between gap-3 mt-4 max-sm:flex-col-reverse">
          <Button icon={<SaveIcon />} disabled={isLoading} aria-label="Save as draft">
            Save as draft
          </Button>
          <Button type="submit" buttonType="primary" disabled={isLoading} aria-label="Add your experience">
            {isLoading && (
              <span className="mr-3" aria-label="Loading">
                <Spinner />
              </span>
            )}
            Add experience
          </Button>
        </footer>
      </form>
    </Modal>
  )
}

export default AddExperienceModal
