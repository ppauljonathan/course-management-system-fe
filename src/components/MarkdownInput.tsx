import { ChangeEvent, useState } from "react";
import ReactMarkdown from "react-markdown";

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
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowPreview(prev => !prev);
          }}
        >Show Preview</button>
        {
          !showPreview &&
          <textarea
            name={name}
            className="border p-2 rounded w-full min-h-40"
            value={value}
            onChange={onChange}
            {...(required ? { required : true } : {})}
          />
        }
        {
          showPreview &&
           <div className="border p-2 rounded w-full prose dark:prose-invert">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        }
        {
          errorMessage &&
          <span className="text-red-800 dark:text-red-400">{errorMessage}</span>
        }
      </div>
    </>
  )
}

export default MarkdownInput;
