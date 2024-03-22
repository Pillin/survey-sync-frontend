import {
  useContext,
  Show,
  createMemo,
  createSignal,
  createEffect,
} from "solid-js";
import { Context, answersSignal, questionsSignal } from "../Contexts/global";
import { useLocation, useParams } from "@solidjs/router";
import { Card } from "../Components/Card";
import { Button } from "../Components/button";

const QuestionPage = () => {
  const { sendMessage } = useContext(Context);
  const location = useLocation();
  const [localPathName, setLocalPathName] = createSignal(location.pathname);
  const [active, setActive] = createSignal("");
  const params = useParams<{ id: string }>();

  const title = createMemo(() => questionsSignal()[params.id].title);
  const questionId = createMemo(() => questionsSignal()[params.id].id);
  const options = createMemo(() =>
    Object.values(questionsSignal()[params.id].options),
  );

  const totalVotes = createMemo(() => {
    let total = 0;
    options().forEach((option) => {
      total += answersSignal()?.[questionId()]?.[option.id] || 0;
    });
    return total;
  });

  createEffect(() => {
    if (localPathName() !== location.pathname) {
      setActive("");
      setLocalPathName(location.pathname);
    }
  });

  const handleMessage = (questionId: string, optionId: string) =>
    sendMessage({ type: "vote", questionId, optionId });

  return (
    <Show when={params.id} keyed>
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
