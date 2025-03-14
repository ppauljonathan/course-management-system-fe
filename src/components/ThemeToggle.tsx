import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

import useDarkMode from "../hooks/useDarkMode";

function ThemeToggle() {
  const [theme, setTheme] = useDarkMode();

  return (
    <>
      <div
        className="absolute bottom-5 left-5 h-16 w-16 border-2 rounded-2xl content-center hover:bg-gray-500 text-gray-50"
        onClick={() => setTheme(theme)}
      >
        {theme == "dark" ? (
          <MoonIcon className="size-12 m-auto" />
        ) : (
          <SunIcon className="size-12 m-auto" />
        )}
      </div>
    </>
  );
}

export default ThemeToggle;
