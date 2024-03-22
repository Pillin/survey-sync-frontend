import { createMemo } from "solid-js";
import { Provider, questionsSignal } from "../Contexts/global";

const UserLayout = (props: any) => {
  const hasQuestions = createMemo(() => {
    return Object.keys(questionsSignal()).length > 0;
  });

  return (
    <main class="container mx-auto px-4 py-8">
      <Provider>
        {hasQuestions() ? props.children : <div>...Loading</div>}
      </Provider>
    </main>
  );
};

export default UserLayout;
