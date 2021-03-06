import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import wrapDisplayName from 'recompose/wrapDisplayName';
import initStore from '../lib/store';
import getContext from '../styles/get-context';
import AppContainer from './app-container';

const store = initStore();

export default BaseComponent => {
  class WithRoot extends Component {
    static getInitialProps(ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx);
      }

      return {};
    }

    componentWillMount() {
      this.styleContext = getContext();
    }

    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    render() {
      return (
        <Provider store={store}>
          <MuiThemeProvider theme={this.styleContext.theme} sheetsManager={this.styleContext.sheetsManager}>
            <AppContainer>
              <BaseComponent {...this.props} />
            </AppContainer>
          </MuiThemeProvider>
        </Provider>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot');
  }

  return WithRoot;
};
