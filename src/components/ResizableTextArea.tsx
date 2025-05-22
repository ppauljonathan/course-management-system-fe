import { ChangeEvent, useRef } from 'react';

interface ResizableTextAreaProps {
  name: string;
  id: string;
  value?: string;
  onChange?: (e: ChangeEvent) => void
}

function ResizableTextArea({name, id, value, onChange}: ResizableTextAreaProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (wrapperRef.current) {
      wrapperRef.current.dataset.replicatedValue = newValue;
    }
  };

  return (
    <div
      ref={wrapperRef}
      data-replicated-value={value}
      className="grid before:content-[attr(data-replicated-value)_] before:whitespace-pre-wrap before:invisible before:border before:border-black before:p-2 before:font-inherit before:[grid-area:1/1/2/2] min-h-40"
    >
      <textarea
        name={name}
        id={id}
        value={value}
        onInput={handleInput}
        onChange={onChange}
        className="resize-none overflow-hidden border border-black p-2 font-inherit [grid-area:1/1/2/2]"
      />
    </div>
  );
};

export default ResizableTextArea;
