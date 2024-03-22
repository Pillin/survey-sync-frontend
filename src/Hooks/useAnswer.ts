import { createMemo } from "solid-js";
import { answersSignal, questionsSignal } from "../Contexts/global";

const useAnswer = () => {
  const questions = createMemo(() => Object.values(questionsSignal()));
  const totalAnswers = createMemo(() => {
    let totalAnswers: Record<string, number> = {};
    questions().forEach((question) => {
      totalAnswers[question.id] = 0;
      Object.values(question.options).forEach((option) => {
        totalAnswers[question.id] +=
          answersSignal()?.[question.id]?.[option.id] || 0;
      });
    });
    return totalAnswers;
  });

  return { questions, totalAnswers }
}

export default useAnswer
