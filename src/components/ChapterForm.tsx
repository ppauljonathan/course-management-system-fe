import { ChangeEvent, FormEvent, useState } from "react";

import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import MarkdownInput from "./MarkdownInput";
import useToast from "../hooks/useToast";
import sendGraphqlRequest from "../utils/graphqlHandler";

interface ChapterFormInterface {
  title: string;
  content: string;
}


interface ChapterFormProps {
  type: 'create' | 'update';
  chapter?: ChapterFormInterface;
}

function ChapterForm({ type, chapter = { title: '', content: '' } }: ChapterFormProps) {
  const [formState, setFormState] = useState<ChapterFormInterface>({
    title: '',
    content: ''
  })
  const [errorMessages, setErrorMessages] = useState({
    title: '',
    content: ''
  })
  const { showToast } = useToast();

  function resetErrorMessages() {
    setErrorMessages({
      title: '',
      content: ''
    })
  }

  function handleChapterCreateResponse() {}

  function handleChapterUpdateResponse() {}

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();

    if(type == 'create') {
      sendGraphqlRequest(
        '',
        {},
        handleChapterCreateResponse,
        showToast
      )
    } else {
      sendGraphqlRequest(
        '',
        {},
        handleChapterUpdateResponse,
        showToast
      )
    }
  }

  function updateFormState(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value
    }));
  }

  return(
    <>
      <div className="flex items-center justify-center h-full mt-10">
        <div className="p-5 border-2 rounded-2xl w-11/12 flex items-center">
          <div className="w-full">
            <h1 className="text-xl font-bold w-full text-center">
              {
                type == 'create' &&
                "Create Chapter"
              }
              {
                type == 'update' &&
                "Edit Chapter Details"
              }
            </h1>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <FormInput
                name="title"
                labelName="Title"
                required={true}
                value={formState.title}
                onChange={updateFormState}
                errorMessage={errorMessages.title}
              />

              <MarkdownInput
                name="content"
                labelName="Content"
                required={true}
                value={formState.content}
                onChange={updateFormState}
                errorMessage={errorMessages.content}
              />

              {
                type == 'create' ?
                  <FormSubmit name="Create" /> :
                  <FormSubmit name="Update" />
              }
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default ChapterForm;
