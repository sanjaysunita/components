import React                                                    from 'react'
import {StyleSheet, TouchableOpacity, View, Text as NativeText} from 'react-native'
import {Icon}                                                   from 'react-native-elements'
import {colors}                                                 from '../theme'

class PassCode extends React.Component {
  state = {
    code: [],
    validating: false,
  }

  handlePressNumber(number) {
    if (this.validating) return
    this.setState(prevState => ({
      code: prevState.code.length < this.props.codeLength ? [...prevState.code, number] : prevState.code,
    }), async () => {
      // Once code is done, trigger handler
      if (this.state.code.length >= this.props.codeLength) {
        this.setState({validating: true})
        if (await this.props.validateCode(this.state.code)) {
          this.props.onValidCode()
        } else {
          this.handleInvalidCode()
        }
        this.setState({validating: false})
      }
    })
  }

  handlePressForgot() {
    if (this.validating) return
    this.props.onForgot()
  }

  handlePressBackspace() {
    if (this.validating) return
    this.setState(prevState => ({
      code: prevState.code.length > 0 ? prevState.code.slice(0, -1) : [],
    }))
  }

  handleInvalidCode() {
    if (this.validating) return
    this.props.onInvalidCode()
    this.setState({code: []})
  }

  render() {
    const indicators = []
    for (let i = 1; i <= this.props.codeLength; i++) {
      let indicatorStyle = {...styles.indicator}
      if (this.state.code.length >= i) indicatorStyle = {...indicatorStyle, ...styles.indicatorFilled}
      if (i === this.props.codeLength) indicatorStyle = {...indicatorStyle, marginRight: 0}
      indicators.push(
        <View
          key={i}
          style={indicatorStyle}
        />
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.indicatorsContainer}>
          {indicators}
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(1)}
            >
              <NativeText style={styles.numberButtonText}>1</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(2)}
            >
              <NativeText style={styles.numberButtonText}>2</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(3)}
            >
              <NativeText style={styles.numberButtonText}>3</NativeText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(4)}
            >
              <NativeText style={styles.numberButtonText}>4</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(5)}
            >
              <NativeText style={styles.numberButtonText}>5</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(6)}
            >
              <NativeText style={styles.numberButtonText}>6</NativeText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(7)}
            >
              <NativeText style={styles.numberButtonText}>7</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(8)}
            >
              <NativeText style={styles.numberButtonText}>8</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(9)}
            >
              <NativeText style={styles.numberButtonText}>9</NativeText>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.forgotButton}
              onPress={() => this.handlePressForgot()}
            >
              <NativeText style={styles.forgotButtonText}>Forgot?</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => this.handlePressNumber(0)}
            >
              <NativeText style={styles.numberButtonText}>0</NativeText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backspaceButton}
              onPress={() => this.handlePressBackspace()}
            >
              <Icon
                name="chevron-left"
                color={colors.lightBlue}
                size={48}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

PassCode.defaultProps = {
  codeLength: 4,
  onForgot: () => null,
  validateCode: () => null,
  onValidCode: () => null,
  onInvalidCode: () => null,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    justifyContent: 'space-between',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  numberButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 100,
  },
  numberButtonText: {
    fontSize: 26,
    color: colors.lightBlue,
  },
  forgotButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
  },
  forgotButtonText: {
    fontSize: 17,
    color: colors.lightBlue,
  },
  backspaceButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 72,
    height: 72,
    textAlign: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 32,
  },
  indicator: {
    width: 24,
    height: 24,
    marginRight: 16,
    backgroundColor: colors.superLightBlue,
    borderRadius: 100,
  },
  indicatorFilled: {
    backgroundColor: colors.lightBlue,
  },
})

export default PassCode
