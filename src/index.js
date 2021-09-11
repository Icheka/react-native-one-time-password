import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';

class OTPField extends Component {

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    otpLength: PropTypes.number,
    tintColor: PropTypes.string,
    offTintColor: PropTypes.string,
    containerStyle: PropTypes.object,
    cellStyle: PropTypes.object,
    defaultValue: PropTypes.string,
    editable: PropTypes.bool,
    textStyle: PropTypes.object,
    cellWidth: PropTypes.number,
    cellHeight: PropTypes.number,
  }

  static defaultProps = {
    onChange: () => null,
    otpLength: 4,
    tintColor: '#11bd04',
    offTintColor: '#8a8a8a',
    containerStyle: {},
    cellStyle: {},
    cellHeight: 60,
    cellWidth: 60
  };

  textInput = null;

  state = {
    internalVal: this.props.value || this.props.defaultValue || ''
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value') && nextProps.value !== this.state.internalVal) {
      this.setState({ internalVal: nextProps.value });
    }
  }

  componentDidMount() {
    this.focus();
  };

  handleChangeText = (val) => {
    const { onChange } = this.props;

    this.setState({ internalVal: val });
    onChange(val);
  };

  // public methods
  inputRef() {
    return this.textInput;
  }

  focus() {
    if (this.props.editable !== false) {
      this.inputRef().focus();
    }
  }

  blur() {
    this.inputRef().blur();
  }

  isFocused() {
    return this.inputRef().isFocused();
  }

  clear() {
    this.setState({ internalVal: '' })
  }

  render() {
    const {
      containerStyle,
      cellStyle,
      tintColor,
      offTintColor,
      otpLength,
      textStyle,
      cellWidth,
      cellHeight,
      ...otherProps
    } = this.props;

    const { internalVal } = this.state;

    return (
      <View>
        <TextInput
          caretHidden
          ref={input => (this.textInput = input)}
          onChangeText={this.handleChangeText}
          style={{ width: ((cellWidth ?? 60) * otpLength) + 40, height: ((cellHeight ?? 60) + 5), padding: 5, ...styles.textInput }}
          value={internalVal}
          minLength={otpLength}
          maxLength={otpLength}
          returnKeyType="done"
          keyboardType="numeric"
          {...otherProps}
        />
        <View style={{
          ...styles.container, ...containerStyle,
        }}>
          {Array(otpLength)
            .fill()
            .map((_, index) => (
              <View
                key={index}
                style={{
                  ...styles.cell,
                  ...cellStyle,
                  height: cellHeight ?? 60,
                  width: cellWidth ?? 60,
                  borderColor: internalVal.length >= 0 && index === internalVal.length ? tintColor : offTintColor
                }}
                onPress={() => this.textInput.focus()}
              >
                <Text style={{ ...styles.textStyle, ...textStyle, }}>
                  {internalVal && internalVal.length > index ? internalVal[index] : " "}
                </Text>
              </View>
            ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cell: {
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `white`,
  },
  textStyle: {
    color: `#313133`,
    fontSize: 20
  },
  textInput: {
    position: `absolute`,
    zIndex: 10,
    color: 'transparent',
  }
});

export default OTPField;