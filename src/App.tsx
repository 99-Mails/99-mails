import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./ui/pages/HomePage";
import MainLayout from "./ui/templates/MainLayout";
import NoMatch from "./ui/pages/NoMatchPage";

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact>
          <MainLayout>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="*" component={NoMatch} />
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
