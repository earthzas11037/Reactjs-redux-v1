import { connect } from "react-redux"
import React from "react";
import cookie from 'react-cookies'
import { createMuiTheme } from '@material-ui/core/styles';
import { Router, Route, Switch, Redirect, } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { history } from "./history"
import LoginPage from "./views/Login";
import RegisterPage from "./views/Register";
import User from "./layouts/User";
import ScrollToTop from "./ScrollToTop"
import './App.css'
import { 
  getUserCurrent,
} from "./redux/actions/authen/index"

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `'Kanit', sans-serif`,
  }
});

class App extends React.Component {
  constructor(props) {
      super();
  }

  componentDidMount = async() => {
    // console.log(this.props.authen.authen)
    if(cookie.load('token')){
      await this.props.getUserCurrent((cookie.load('token')),(result) => {

      })
    }
  }

  render() {
      return (
        <ThemeProvider theme={THEME}>
            <Router history={history}>
                  <ScrollToTop />
                  <Switch>
                    <Route path={"/login"} component={LoginPage}/>
                    <Route path={"/register"} component={RegisterPage}/>
                    <Route path="/" component={User} />
                    <Redirect from="/" to="/" />
                  </Switch>
            </Router>
        </ThemeProvider>
      )
  }
}

const mapStateToProps = state => {
  return {
      authen: state.authen
  }
}

export default connect(mapStateToProps, { getUserCurrent })(App);
