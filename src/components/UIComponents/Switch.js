import React from 'react';
import { Switch as Switcher } from 'react-native';
import PropTypes from 'prop-types';
import CustomTheme, { withTheme } from '../../theme';

function Switch({
  initialValue,
  onChange,
  color,
  disabled,
  trackColor,
  ios_backgroundColor,
  ...rest
}) {
  const [switchValue, setSwitchValue] = React.useState(initialValue);
  React.useEffect(() => {
    onChange(switchValue);
  }, [switchValue]);
  function onPressSwitch() {
    setSwitchValue(!switchValue);
    return null;
  }

  // trackColor.true = color === 'primary' ? CustomTheme.COLORS.PRIMARY : color;

  return (
    <Switcher
      disabled={disabled}
      trackColor={{ ...trackColor }}
      ios_backgroundColor={ios_backgroundColor}
      value={switchValue}
      onValueChange={() => {
        onPressSwitch();
      }}
      {...rest}
    />
  );
}

Switch.defaultProps = {
  color: CustomTheme.COLORS.PRIMARY,
  ios_backgroundColor: CustomTheme.COLORS.GREY,
  trackColor: {
    false: CustomTheme.COLORS.GREY,
    true: CustomTheme.COLORS.PRIMARY,
  },
  disabled: false,
  initialValue: false,
};

Switch.propTypes = {
  ...Switcher.propTypes,
  color: PropTypes.oneOfType([
    PropTypes.oneOf(['primary', 'theme', 'error', 'warning', 'success', 'info']),
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  initialValue: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default withTheme(Switch);
