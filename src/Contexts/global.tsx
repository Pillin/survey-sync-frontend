import { createContext, createSignal } from "solid-js";
import usePartyKit from "../Hooks/usePartyKit";
import { PARTYKIT_HOST, ROOM } from "../Utils/constants";
import { useLocation, useNavigate } from "@solidjs/router";

type MessageTypes =
  | {
      value: string;
      type: "navigation";
    }
  | {
      type: "clear";
    }
  | {
      questionId: string;
      optionId: string;
      type: "vote";
    };

type Routes = "/" | "/questions/0" | "/questions/1" | "/result";
type ContextInterface = {
  userId: string;
  sendMessage: (message: MessageTypes) => void;
};

export const Context = createContext<ContextInterface>({
  userId: "",
  sendMessage: () => {},
});

export const [answersSignal, setAnswersSignal] = createSignal<
  Record<string, Record<string, number>>
>({});

export const [questionsSignal, setQuestionsSignal] = createSignal<
  Record<
    string,
    {
      id: string;
      title: string;
      options: Record<
        string,
        {
          id: string;
          value: string | number;
        }
      >;
    }
  >
>({});

const useNavigateTo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (route: Routes) => {
    if (location.pathname === route) {
      return;
    }
    navigate(route, {
      replace: true,
    });
  };
};

export const Provider = (props: { children: any }) => {
  const location = useLocation();
  const navigateTo = useNavigateTo();
  const handleMessage = (
    message:
      | {
          senderId: undefined;
          value: Routes;
          type: "navigation";
        }
      | {
          senderId: string;
          value: Record<number, Record<number, number>>;
          type: "answers";
        }
      | {
          senderId: string;
          results: Record<number, Record<number, number>>;
          questions: Record<
            string,
            {
              id: string;
              title: string;
              options: Record<
                string,
                {
                  id: string;
                  value: string | number;
                }
              >;
            }
          >;
          navigation: Routes;
          type: "sync";
        },
  ) => {
    if (message.type === "navigation") {
      if (location.pathname.startsWith("/admin")) {
        return;
      }
      navigateTo(message.value);
    }
    if (message.type === "sync") {
      console.log("🚨MESSAGE", message);
      setAnswersSignal(message.results);
      if (Object.keys(questionsSignal()).length === 0) {
        setQuestionsSignal(message.questions);
      }
      if (!location.pathname.startsWith("/admin")) {
        navigateTo(message.navigation);
      }
    }
    if (message.type === "answers") {
      setAnswersSignal({});
    }
    if (message.type === "answers") {
      setAnswersSignal(message.value);
    }
  };

  const { sendMessage, userId } = usePartyKit({
    host: PARTYKIT_HOST,
    room: ROOM,
    handleMessage,
  });

  return (
    <Context.Provider value={{ sendMessage, userId }}>
      {props.children}
    </Context.Provider>
  );
};
