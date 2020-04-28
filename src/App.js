import React, {useEffect} from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {normalize} from 'styled-normalize'; //wyzerowanie cssa
import { Navigation, Wrapper, LoadingIndicator, Button } from './components/index';
import theme from './style/theme';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {fetchBudget, fetchBudgetCategories} from './data/actions/budget.action';

function App({budget,fetchBudget, fetchBudgetCategories}) {
  useEffect(()=> {
    fetchBudget(1)
    fetchBudgetCategories(1)
  }, [fetchBudget,fetchBudgetCategories])
  

  const {i18n} = useTranslation(); 
  return (
    //kazdy komponent ma dostep do obiektu theme
    <>
      <GlobalStyles/>
    

      <Router>
        <Navigation items={[
            { content: 'Homepage', to: '/',},
            { content: 'Budget', to: '/budget'}
          ]}
          RightElement={(
            <div>
              <Button variant="inline" onClick={()=> i18n.changeLanguage('pl')}>pl</Button>
              <Button variant="regular" onClick={()=> i18n.changeLanguage('en')}>en</Button>
            </div>
          )}/>
          <Wrapper>
            <Switch> 
              <Route exact path="/">Home</Route>
              <Route exact path="/budget">Budget page</Route>
          </Switch>
          </Wrapper>
      </Router>
    </>
  );
}

const ConnectedApp = connect(state=> { //state to common i budget
  return {
    budget: state.budget.budget
}}, {
    fetchBudget, //funcja asynchroniczna 
    fetchBudgetCategories,
  })(App)

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator/>}>
        <ConnectedApp/>
      </React.Suspense>
    </ThemeProvider>
  )
}

export default RootApp;


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