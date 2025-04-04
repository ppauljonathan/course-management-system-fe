import { ChangeEvent, FormEvent, useState } from "react";

import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import sendGraphqlRequest from "../utils/graphqlHandler";
import courseCreate from "../queries/courseCreate";
import useToast from "../hooks/useToast";
import CourseMutationResponseInterface from "../interfaces/graphql/courses/courseMutationResponseInterface";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import { useNavigate } from "react-router";

interface CourseCreateResponse {
  data: { courseCreate: CourseMutationResponseInterface };
  errors?: [ErrorInterface];
}

interface CourseFormInterface {
  name: string;
  description: string;
  price: number;
  live: boolean;
  id?: number;
}

interface CourseFormProps {
  type: string;
  course?: CourseFormInterface;
}

function CourseForm(
  {
    type,
    course = {
      name: '',
      description: '',
      price: 0.0,
      live: false
    }
  }: CourseFormProps
) {
  const [formState, setFormState] = useState(course);
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    description: '',
    price: '',
  });
  const { showToast } = useToast();
  const navigate = useNavigate();

  function resetErrorMessages() {
    setErrorMessages({
      name: '',
      description: '',
      price: '',
    });
  }

    function assignErrorMessages(errors: [ErrorInterface]) {
    errors.forEach((error) => {
      setErrorMessages((prev) => ({
        ...prev,
        [error.location]: error.message
      }))
    })
  }

  function handleGraphqlResponse({ data, errors }: CourseCreateResponse) {
    if(errors && errors.length > 0) {
      showToast(errors.join(', '), 'error');
      return;
    }

    const { errors: userErrors } = data.courseCreate

    if(userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    showToast("Course Created Successfully", 'success');
    navigate('/courses-list/created');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();
    sendGraphqlRequest(courseCreate, { course: formState }, handleGraphqlResponse, showToast);
  }

  function updateFormState(e: ChangeEvent) {
    setFormState((prev) => ({
      ...prev,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value,
    }));
  }

  return (
    <>
      <div className="flex items-center justify-center h-full mt-10">
        <div className="p-5 border-2 rounded-2xl w-4xl flex items-center">
          <div className="w-full">
            <h1 className="text-xl font-bold w-full text-center">
              {
                type == 'create' &&
                "Create Course"
              }
              {
                type == 'update' &&
                "Update Course"
              }
            </h1>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FormInput
                name="name"
                labelName="Name"
                required={true}
                value={formState.name}
                onChange={updateFormState}
                errorMessage={errorMessages.name}
              />

              <FormInput
                name="description"
                labelName="Description"
                required={true}
                value={formState.description}
                onChange={updateFormState}
                errorMessage={errorMessages.description}
                type="textarea"
              />

              <FormInput
                name="price"
                labelName="Price in USD"
                required={true}
                value={formState.price}
                onChange={updateFormState}
                errorMessage={errorMessages.price}
                type="number"
                min={0.0}
                step={0.01}
              />
              <div className="italic mt-10">* Note: submitting this form will create the course as a draft</div>
              <FormSubmit name="Create" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CourseForm
