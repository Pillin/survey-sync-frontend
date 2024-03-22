// import React from 'react'

type Props = {
  title: string;
  description: string;
};

export const Card = ({ title, description }: Props) => {
  return (
    <div
      // href="#"
      class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p class="font-normal text-2xl text-gray-700 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
