import { ChangeEvent, useState } from "react";
import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import { ArrowLongDownIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import FormInputLabel from "./FormInputLabel";

interface MarkdownInputProps {
  name: string;
  labelName: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent) => void;
  errorMessage?: string;
}

function MarkdownInput({ name, labelName, required, value, onChange, errorMessage }: MarkdownInputProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div>
        <FormInputLabel name={name} labelName={labelName} required={required} />
        <div className="p-2 border rounded">
          <div className="flex">
            <div
              onClick={() => { setShowPreview(false); }}
              className={`p-2 border rounded m-2 ${showPreview ? '' : 'bg-gray-200 dark:bg-gray-500' }`}
            >Raw</div>
            <div
              onClick={() => { setShowPreview(true); }}
              className={`p-2 border rounded m-2 ${showPreview ? 'bg-gray-200 dark:bg-gray-500' : '' }`}
            >Preview</div>
            <div className="group ml-auto">

              <Link to="/md-help" target="_blank">
                <QuestionMarkCircleIcon className="size-6" />
              </Link>
              <p className="absolute text-white bg-black p-2 rounded hidden group-hover:block">Markdown Tutorial</p>
            </div>
          </div>
          {
            !showPreview &&
            <textarea
              name={name}
              id={name}
              className="border p-2 rounded w-full min-h-40 overflow-y-auto"
              value={value}
              onChange={onChange}
              {...(required ? { required : true } : {})}
            />

            // TODO Make the TextArea autoresizable
          }
          {
            showPreview &&
             <div className="border p-2 rounded w-full max-w-full min-h-40 prose dark:prose-invert overflow-y-auto">
              <ReactMarkdown>{value || "Nothing to Preview..."}</ReactMarkdown>
            </div>
          }
          <div className="group">
            <div className="w-fit p-0.5 border-2 rounded-sm font-bold flex justify-center mt-2">
              <p className="text-sm">M</p>
              <ArrowLongDownIcon className="size-4" />
            </div>
            <p className="absolute text-white bg-black p-2 rounded hidden group-hover:block">Markdown Input</p>
          </div>
        </div>
        {
          errorMessage &&
          <span className="text-red-800 dark:text-red-400">{errorMessage}</span>
        }
      </div>
    </>
  )
}

export default MarkdownInput;
