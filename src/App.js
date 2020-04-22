import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {normalize} from 'styled-normalize'; //wyzerowanie cssa
import { Navigation } from './components/index';
import theme from './style/theme';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    //kazdy komponent ma dostep do obiektu theme
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
    

      <Router>
        <Navigation items={[
            { content: 'Homepage', to: '/',},
            { content: 'Budget', to: '/budget'}
          ]}/>
        <Switch>
          <Route exact path="/">Home</Route>
          <Route exact path="/budget">Budget page</Route>
        </Switch>
      </Router>

    </ThemeProvider>
 
  );
}

export default App;


//style globalne dla kazdej strony?
const GlobalStyles = createGlobalStyle`
${normalize}
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li+ li {
      margin-left: ${({theme}) => theme.spacing.xs}px;
    };
  };
`