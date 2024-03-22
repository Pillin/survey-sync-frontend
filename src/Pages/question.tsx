import {
  useContext,
  Show,
  createMemo
} from "solid-js";
import { Context } from "../Contexts/global";
import { Card } from "../Components/Card";
import { Button } from "../Components/button";
import useNavigation from "../Hooks/useNavigation";
import useQuestion from "../Hooks/useQuestion";

const QuestionPage = () => {
  const { sendMessage } = useContext(Context);
  const { active, setActive } = useNavigation()
  const { id, title, options, questionId, totalVotes } = useQuestion()

  const handleMessage = (questionId: string, optionId: string) =>
    sendMessage({ type: "vote", questionId, optionId });

  return (
    <Show when={id} keyed>
      <section class="flex flex-col gap-8">
        <Card description={title()} title={`Question ${questionId()}`} />
        <div class="flex flex-wrap justify-around" role="group">
          {options().map(({ id, value }) => (
            <Button
              isActive={createMemo(() => active() === id)}
              onClick={() => {
                setActive(id);
                handleMessage(questionId(), id);
              }}
            >
              <span>
                <span class="opacity-60">Answer {id}:</span>{" "}
                <span class="font-bold">{value}</span>
              </span>
            </Button>
          ))}
        </div>
        <div class="flex justify-center font-bold">
          Total Votes — {totalVotes()}
        </div>
      </section>
    </Show>
  );
};
export default QuestionPage;
