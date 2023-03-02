/* eslint-disable no-nested-ternary */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import { addCampaign } from '../api/axios'

function AddModal() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const campaignMutation = useMutation({
    mutationFn: (campaignDetails: { title: string; description: string }) =>
      addCampaign(campaignDetails),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] })
    },
  })

  async function handleAdd(values: { title: string; description: string }) {
    campaignMutation.mutate(values, {
      onSuccess: () => {
        navigate(-1)
      },
    })
  }

  return (
    <div
      className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
      onClick={() => navigate('/user/campaigns', { state: {} })}
      aria-hidden="true"
    >
      <div
        className="w-[80%] rounded-lg bg-white p-5 shadow-md"
        onClick={(e) => {
          e.stopPropagation()
        }}
        aria-hidden="true"
      >
        <div className="flex flex-col gap-1 border-b-2 py-2">
          <span className="text-2xl">Add a new Campaign</span>
          <span className="text-md">We will help support your cause</span>
        </div>
        <Formik
          initialValues={{
            title: '',
            description: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title required').max(40),
            description: Yup.string().required('Description required'),
          })}
          // eslint-disable-next-line react/jsx-no-bind
          onSubmit={handleAdd}
        >
          {(props: FormikProps<any>) => (
            <Form>
              <div className="my-4 flex flex-col gap-2">
                <div>
                  <Field
                    name="title"
                    className={`w-full rounded-[0.25rem] border border-solid border-pink-200 bg-pink-50 px-4 py-3 text-lg text-black outline-0 focus:ring-0 ${
                      (props.errors.title && props.touched.title) ||
                      (campaignMutation.isError && 'border-red-500')
                    }`}
                    placeholder="Title"
                  />
                  <ErrorMessage
                    name="title"
                    className="text-sm text-red-500"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    name="description"
                    component="textarea"
                    className={`w-full rounded-[0.25rem] border border-solid border-pink-200 bg-pink-50 px-4 py-3 text-lg text-black outline-0 focus:ring-0 ${
                      (props.errors.description && props.touched.description) ||
                      (campaignMutation.isError && 'border-red-500')
                    }`}
                    placeholder="Description"
                  />
                  <ErrorMessage
                    name="description"
                    className="text-sm text-red-500"
                    component="span"
                  />
                </div>
                <button
                  type="submit"
                  className={`mt-4 flex w-fit cursor-pointer items-center justify-between gap-1 self-end rounded-[0.25rem] bg-pink-500 px-4 py-2 text-lg font-normal text-white disabled:opacity-40 ${
                    campaignMutation.isSuccess && 'bg-green-600'
                  }`}
                  disabled={!props.isValid || campaignMutation.isLoading}
                >
                  <span>
                    {campaignMutation.isSuccess
                      ? 'Created'
                      : campaignMutation.isLoading
                      ? 'Loading'
                      : 'Create'}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 text-[0.875rem]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddModal
