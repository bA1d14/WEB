import {Component} from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import RenderLogin from "./Login";
import RenderMenu from "./Menu"
import RenderForgot from "./Forgot";
import RenderSignUp from "./SignUp";


class App extends Component {
  render(){
      return(
            <Router>
                <div className={'Calendar'}>
                    <Switch>
                        <Route path='/' exact component={RenderLogin}/>
                        <Route path='/menu'  component={RenderMenu}/>
                        <Route path='/signup'  component={RenderSignUp}/>
                        <Route path='/forgot'  component={RenderForgot}/>
                    </Switch>
                </div>
            </Router>
      )}


}

export default App;
