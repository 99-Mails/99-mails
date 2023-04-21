import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "@/ui/templates/MainLayout";
import DefaultLayout from "@/ui/templates/DefaultLayout";

import NoMatch from "@/ui/pages/NoMatchPage";

import HomePage from "@/ui/pages/HomePage";
import LoginPage from "@/ui/pages/authenticate/LoginPage";
import RegisterPage from "@/ui/pages/authenticate/RegisterPage";

import { CustomSwitch } from "@/ui/components/Router";
import { LogoutPage } from "./ui/pages/authenticate/LogoutPage";
import { DashboardPage } from "./ui/pages/DashboardPage";
import { DashboardLayout } from "@/ui/templates/DashboardLayout";

function App() {
  return (
    <Router basename="/">
      <Switch>
        <Route path="/" exact>
          <MainLayout>
            <CustomSwitch>
              <Route path="/" exact component={HomePage} />
            </CustomSwitch>
          </MainLayout>
        </Route>

        <Route path={["/login", "/register", "/logout"]}>
          <DefaultLayout>
            <CustomSwitch>
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/logout" exact component={LogoutPage} />
            </CustomSwitch>
          </DefaultLayout>
        </Route>

        <Route>
          <DashboardLayout>
            <CustomSwitch>
              <Route path="/dashboard" component={DashboardPage} />
            </CustomSwitch>
          </DashboardLayout>
        </Route>

        <Route path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
