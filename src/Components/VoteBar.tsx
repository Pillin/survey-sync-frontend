type Props = {
  percentage: number;
};

export const VoteBar = ({ percentage }: Props) => {
  return (
    <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
      <div
        class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 transition-all ease-in-out duration-300"
        style={{
          width: `${percentage}%`,
        }}
      />
    </div>
  );
};
