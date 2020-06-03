import React from 'react';
import PropTypes from 'prop-types';

// import COLORS & SIZES
import THEME_COLORS from './colors';
import THEME_SIZES from './sizes';

// default theme with COLORS & SIZES
const CustomTheme = {
  COLORS: THEME_COLORS,
  SIZES: THEME_SIZES,
};

export default CustomTheme;

// creating the CustomTheme context
const ThemeContext = React.createContext();

/*
*   withTheme
*   args: Component - React Component, styles to be added to Component
*   theme: if no styles or theme add default theme={ SIZES, COLORS }
*/

export function withTheme(Component, styles) {
  // eslint-disable-next-line react/no-multi-comp
  return class extends React.Component {
    render() {
      const { props } = this;
      return (
        <ThemeContext.Consumer>
          {theme => (
            <Component
              {...props}
              theme={{ ...CustomTheme, ...theme }}
              styles={styles && styles({ ...CustomTheme, ...theme })}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  };
}

/*
*   ThemeProvider using React.Component
*   ThemeContext.Provider value has the default value from { COLORS, SIZES }
*/

// eslint-disable-next-line react/no-multi-comp
export class ThemeProvider extends React.Component {
  static defaultProps = {
    children: null,
    theme: {},
  }

  render() {
    const { theme, children } = this.props;
    const { COLORS: CUSTOM_COLORS, SIZES: CUSTOM_SIZES, customTheme } = theme;

    const providerTheme = {
      COLORS: { ...CustomTheme.COLORS, ...CUSTOM_COLORS },
      SIZES: { ...CustomTheme.SIZES, ...CUSTOM_SIZES },
      ...customTheme
    };

    return (
      <ThemeContext.Provider value={providerTheme}>
        {children}
      </ThemeContext.Provider>
    );
  }
}

ThemeProvider.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
};
