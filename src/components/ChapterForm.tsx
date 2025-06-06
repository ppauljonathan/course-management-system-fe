import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import FormInput from "./FormInput";
import FormSubmit from "./FormSubmit";
import MarkdownInput from "./MarkdownInput";
import useToast from "../hooks/useToast";
import sendGraphqlRequest from "../utils/graphqlHandler";
import chapterCreate from "../queries/chapterCreate";
import chapterUpdate from "../queries/chapterUpdate";
import ChapterMutationResponseInterface from "../interfaces/graphql/chapters/chapterMutationResponseInterface";
import ErrorInterface from "../interfaces/graphql/common/errorInterface";
import ChapterFormInterface from "../interfaces/common/chapterFormInterface";

interface ChapterCreateResponse {
  data: { chapterCreate: ChapterMutationResponseInterface; };
  errors: [ErrorInterface];
}

interface ChapterUpdateResponse {
  data: { chapterUpdate: ChapterMutationResponseInterface; };
  errors: [ErrorInterface];
}

interface ChapterFormProps {
  type: 'create' | 'update';
  chapter?: ChapterFormInterface;
  courseId?: string;
}

function ChapterForm({ type, chapter, courseId }: ChapterFormProps) {
  const [formState, setFormState] = useState<ChapterFormInterface>({
    title: '',
    content: ''
  })
  const [errorMessages, setErrorMessages] = useState({
    title: '',
    content: ''
  })
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (type == 'update' && chapter) {
      setFormState(chapter)
    }
  }, [type, chapter])

  function resetErrorMessages() {
    setErrorMessages({
      title: '',
      content: ''
    })
  }

  function assignErrorMessages(errors: [ErrorInterface]) {
    errors.forEach((error) => {
      setErrorMessages((prev) => ({
        ...prev,
        [error.location]: error.message
      }))
    });
  }

  function handleChapterCreateResponse({data, errors}: ChapterCreateResponse) {
    if(errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    const { errors: userErrors } = data.chapterCreate;

    if(userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;
    }

    showToast("Chapter Created Successfully", "success");
    navigate(`/courses/${courseId}/chapters/${data.chapterCreate.chapter.id}/edit`);
  }

  function handleChapterUpdateResponse({ data, errors }: ChapterUpdateResponse) {
    if(errors && errors.length > 0) {
      showToast(errors.map(e => e.message).join(', '), 'error');
      return;
    }

    const { errors: userErrors } = data.chapterUpdate

    if(userErrors.length > 0) {
      assignErrorMessages(userErrors);
      return;

    }
    showToast("Chapter Updated Successfully", "success");
    navigate(`/courses/${courseId}/chapters/${data.chapterUpdate.chapter.id}/edit`);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    resetErrorMessages();

    if(type == 'create') {
      sendGraphqlRequest<ChapterCreateResponse>(
        chapterCreate,
        { chapter: { ...formState, courseId: courseId } },
        handleChapterCreateResponse,
        showToast
      )
    } else {
      sendGraphqlRequest<ChapterUpdateResponse>(
        chapterUpdate,
        { chapter: { ...formState, courseId: courseId } },
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
