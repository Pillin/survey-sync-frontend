import {
  createMemo,
} from "solid-js";
import { answersSignal, questionsSignal } from "../Contexts/global";
import { useParams } from "@solidjs/router";

const useQuestion = () => {
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

  return { title, totalVotes, questionId, options, id: params.id }
}

export default useQuestion
