import { JSX } from "solid-js";

type Props = {
  children: JSX.Element;
};

export const Badge = (props: Props) => {
  return (
    <span class="bg-yellow-100 text-yellow-800 text-md font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
      {props.children}
    </span>
  );
};
