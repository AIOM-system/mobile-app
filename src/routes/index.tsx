import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet, IonTabs } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import TabBar from "../components/TabBar/TabBar";

/* Pages */
import Login from "../pages/Auth/Login/Login";
import NotFound from "../pages/Error/NotFound";

export const Routes: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route path="/tabs" component={TabBar} />

          <Route component={NotFound} />

          {/* <Route exact path="/">
            <Redirect to="/tabs/home" />
          </Route> */}

          <Redirect exact from="/" to="/tabs/home" />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  );
};
