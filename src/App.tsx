import { Router, Route } from "@solidjs/router";
import InitialPage from "./Pages/initial";
import QuestionPage from "./Pages/question";
import AdminPage from "./Pages/admin";
import ResultPage from "./Pages/result";
import UserLayout from "./Pages/userLayout";

function App() {
  return (
    <Router>
      <Route path="/" component={UserLayout}>
        <Route path="/" component={InitialPage} />
        <Route path="/questions">
          <Route path="/:id" component={QuestionPage} />
        </Route>
        <Route path="/result" component={ResultPage} />
        <Route path="/admin" component={AdminPage} />
      </Route>
    </Router>
  );
}

export default App;
