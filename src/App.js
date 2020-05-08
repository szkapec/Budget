import React, {useEffect, useCallback } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import {normalize} from 'styled-normalize'; //wyzerowanie cssa
import { Navigation, Wrapper, LoadingIndicator, Button } from './components/index';
import theme from './style/theme';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import Budget from './pages/Budget';
function App() {

  

  const {i18n} = useTranslation(); 
  const changeLanguage = useCallback(lng => {
    i18n.changeLanguage(lng);
  }, [i18n]);
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
              <Button variant="inline" primary={i18n.language === 'pl'} onClick={()=> changeLanguage('pl')}>pl</Button>
              <Button variant="regular"  primary={i18n.language === 'en'} onClick={() => changeLanguage('en')}>en</Button>
            </div>
          )}/>
          <Wrapper>
            <Switch> 
              <Route exact path="/">Home</Route>
              <Route exact path="/budget"><Budget/></Route>
          </Switch>
          </Wrapper>
      </Router>
    </>
  );
}



function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator/>}>
        <App/>
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