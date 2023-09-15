import React                      from 'react'
import {View, Keyboard, Platform} from 'react-native'

export default class KeyboardShift extends React.Component {
  state = {
    keyboardHeight: 0,
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this))
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  handleKeyboardDidShow(e) {
    this.setState({keyboardHeight: e.endCoordinates.height})
  }

  handleKeyboardDidHide() {
    this.setState({keyboardHeight: 0})
  }

  render() {
    return (
      <View style={this.props.style}>
        {this.props.children}
        {Platform.OS === 'ios' && (
          <View style={{height: this.state.keyboardHeight}}/>
        )}
      </View>
    )
  }
}
