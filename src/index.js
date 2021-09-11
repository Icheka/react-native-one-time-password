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
    editable: PropTypes.bool
  }

  static defaultProps = {
    onChange: () => null,
    otpLength: 4,
    tintColor: '#11bd04',
    offTintColor: '#313133',
    containerStyle: {},
    cellStyle: {}
  };

  textInput = null;

  state = {
    internalVal: this.props.value || this.props.defaultValue || ''
  }

  componentDidUpdate(nextProps) {
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
      ...otherProps
    } = this.props;

    const { internalVal } = this.state;

    return (
      <View>
        <TextInput
          ref={input => (this.textInput = input)}
          onChangeText={this.handleChangeText}
          style={{ width: 0, height: 0 }}
          value={internalVal}
          minLength={otpLength}
          maxLength={otpLength}
          returnKeyType="done"
          keyboardType="numeric"
          {...otherProps}
        />
        <View style={{
          ...styles.container, ...containerStyle, borderColor: internalVal.length >= 0 && index === (internalVal.length - 1) ? tintColor : offTintColor
        }}>
          {Array(otpLength)
            .fill()
            .map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  cellStyle,
                ]}
                onPress={() => this.textInput.focus()}
              >
                {internalVal && internalVal.length > index ? internalVal[index] : " "}
              </Text>
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
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    flex: 1
  },
  cell: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    width: 50,
    height: 50,
  }
});

export default OTPField;

