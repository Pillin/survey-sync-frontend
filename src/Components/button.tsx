import { Accessor, JSX } from "solid-js";

export const Button = ({
  children,
  onClick,
  isActive,
}: {
  children: JSX.Element;
  onClick: () => void;
  isActive?: Accessor<boolean>;
}) => {
  return (
    <button
      onClick={onClick}
      class="relative inline-flex w-full items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
    >
      {isActive?.() ? <span class="px-1">👉</span> : ""}
      <span class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  );
};
