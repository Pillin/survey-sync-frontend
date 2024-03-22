import {
  createSignal,
  createEffect,
} from "solid-js";
import { useLocation } from "@solidjs/router";

const useNavigation = () => {
  const location = useLocation();
  const [localPathName, setLocalPathName] = createSignal(location.pathname);
  const [active, setActive] = createSignal("");

  createEffect(() => {
    if (localPathName() !== location.pathname) {
      setActive("");
      setLocalPathName(location.pathname);
    }
  }, []);

  return { active, setActive }
}

export default useNavigation