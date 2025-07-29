import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ChangeEvent, FormEvent, useState } from 'react';

import FormInput from '../FormInput';
import FormSubmit from '../FormSubmit';
import { useNavigate } from 'react-router';

interface SearchBarProps {
  searchTerm: string;
  pathname: string;
}

function SearchBar({ searchTerm, pathname }: SearchBarProps) {
  const [showBar, setShowBar] = useState<boolean>(searchTerm.length != 0);
  const [formState, setFormState] = useState({
    search: searchTerm
  })
  const navigate  = useNavigate()

  function updateFormState(e: ChangeEvent) {
    const target = e.target as HTMLInputElement;

    setFormState((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    navigate(`${pathname}?q=${formState.search}`)
  }

  return (
    <>
      <div className={`flex p-5 border rounded-2xl w-fit ${showBar && 'bg-gray-400 dark:bg-gray-800'} hover:bg-gray-400 dark:hover:bg-gray-800`} onClick={() => { setShowBar((prev) => !prev) }} >
        Search
        <MagnifyingGlassIcon className='size-6 ml-2 cursor-pointer'/>
      </div>
      {
        showBar &&
        <form className="mt-4 space-y-3 border p-5 rounded-2xl" onSubmit={handleSubmit}>
            <div className='w-full text-center text-xl font-bold'>Search</div>
            <FormInput
              name='search'
              labelName='Search (Title, Description)'
              value={formState.search}
              required={false}
              onChange={updateFormState}
            />

            <FormSubmit name='Search' />
        </form>
      }
    </>
  )
}

export default SearchBar;
