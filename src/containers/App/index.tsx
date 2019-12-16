import React from "react";
import "./style.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "../../reducers/index";
import ArticlesPreviewListPage from "../../pages/ArticlePreviewListPage";
import ArticlePage from "../../pages/ArticlePage";

import RegistryPage from "../../pages/RegistryPage";
import LoginPage from "../../pages/LoginPage";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default class App extends React.PureComponent<{}> {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/registry">
                <RegistryPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/articles" />
              </Route>
              <Route exact path="/articles">
                <ArticlesPreviewListPage />
              </Route>
              <Route path="/articles/:id" component={ArticlePage} />
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}
