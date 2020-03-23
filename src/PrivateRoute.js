import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import pathNames from "./constants/pathNames";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    // <Route exact path={!!currentUser ? pathNames.teamList : pathNames.login} />
    <Route
      {...rest}
      render={routeProps => {
        console.log("Props: ", routeProps);
        return !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={pathNames.login} />
        );
      }}
    />
  );
};

export default PrivateRoute;
