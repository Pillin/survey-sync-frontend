import { useContext } from "solid-js";
import { Context, answersSignal } from "../Contexts/global";
import { Button } from "../Components/button";
import { VoteBar } from "../Components/VoteBar";
import { Badge } from "../Components/badge";
import useAnswer from "../Hooks/useAnswer";

const Admin = () => {
  const { sendMessage } = useContext(Context);
  const { questions, totalAnswers } = useAnswer()

  return (
    <section class="flex flex-col gap-4">
      <h1 class="text-3xl">Admin Page</h1>
      <div class="flex flex-col gap-10">
        {questions().map((question) => (
          <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Question {question.id}</h2>
            <h3 class="text-md font-light italic">{question.title}</h3>
            <h3 class="text-md font-light">
              <Badge>{totalAnswers()[question.id] || 0} Total Votes</Badge>
            </h3>
            <div class="flex flex-col gap-2">
              {Object.values(question.options).map(({ id }) => {
                const percentage =
                  ((answersSignal()?.[question.id]?.[id] || 0) /
                    totalAnswers()[question.id]) *
                  100;
                const safePercentage = isNaN(percentage) ? 0 : percentage;
                return (
                  <div class="flex flex-row gap-5 items-center">
                    <div class="whitespace-nowrap">
                      {id}: {safePercentage} %
                    </div>
                    <VoteBar percentage={safePercentage} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div class="flex gap-4">
        <Button onClick={() => sendMessage({ type: "navigation", value: "/" })}>
          Start
        </Button>
        {questions().map((question) => (
          <Button
            onClick={() =>
              sendMessage({
                type: "navigation",
                value: `/questions/${question.id}`,
              })
            }
          >
            <>Question {question.id}</>
          </Button>
        ))}

        <Button
          onClick={() => sendMessage({ type: "navigation", value: "/result" })}
        >
          Result
        </Button>
        <Button onClick={() => sendMessage({ type: "clear" })}>🚨 CLEAR</Button>
      </div>
    </section>
  );
};

export default Admin;
