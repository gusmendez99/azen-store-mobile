import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import PropTypes from 'prop-types';

import CustomTheme, { withTheme } from '../../theme';
import getIconType from '../../helpers/getIconType';
import themeConfig from '../../config/theme.json';

const Theme = createIconSetFromIcoMoon(themeConfig, 'Theme', '../../fonts/theme.ttf');

// Theme Fonts have to be linked with 'react-native link' if you're using react-native-cli
// Theme Fonts have to loaded with Fonts.loadAsync if you're
// using Expo (you can export ThemeFont from index in order to import it)

function Icon({
  name,
  family,
  size,
  color,
  styles,
  theme,
  ...rest
}) {
  if (family === 'Theme') {
    if (name) {
      return (
        <Theme
          name={name}
          size={size || theme.SIZES.BASE}
          color={color || theme.COLORS.BLACK}
          {...rest}
        />
      );
    }
  } else {
    const IconInstance = getIconType(family);
    if (name && IconInstance) {
      return (
        <IconInstance
          name={name}
          size={size || theme.SIZES.BASE}
          color={color || theme.COLORS.BLACK}
          {...rest}
        />
      );
    }
  }

  return null;
}

Icon.defaultProps = {
  name: null,
  family: null,
  size: null,
  color: null,
  styles: {},
  theme: CustomTheme,
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  family: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  styles: PropTypes.any,
  theme: PropTypes.any,
};

export default withTheme(Icon);
