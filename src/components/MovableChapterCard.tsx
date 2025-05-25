import { Bars2Icon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid"

function MovableChapterCard() {
  return (
    <>
      <div className="w-full p-5 rounded-2xl border mt-5 font-bold flex">
        <p>Chapter 1</p>
        <div className="flex ml-auto">
          <PencilSquareIcon className="size-6 ml-2" />
          <TrashIcon className="size-6 ml-2" />
          <Bars2Icon className="size-6 ml-2" />
        </div>
      </div>
    </>
  );
};

export default MovableChapterCard;
