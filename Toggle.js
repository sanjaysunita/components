import React                                                          from 'react'
import {Animated, Easing, View, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {colors}                                                       from '../theme'

const RIGHT_POS_ACTIVE   = 2
const RIGHT_POS_INACTIVE = 26

class Toggle extends React.Component {
  state = {
    toggled: this.props.toggled,
    toggling: false,
  }

  rightPosition = new Animated.Value(this.props.toggled ? 1 : 0)

  handleToggle() {
    if (this.state.toggling) return
    this.setState({toggling: true})
    this.rightPosition.setValue(this.state.toggled ? 1 : 0)
    Animated.timing(this.rightPosition, {
      toValue: this.state.toggled ? 0 : 1,
      easing: Easing.linear,
      duration: 200,
    }).start(() => {
      this.setState({toggling: false})
    })

    this.setState(prevState => ({
      toggled: !prevState.toggled,
    }), () => {
      this.props.onToggle(this.state.toggled)
    })
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.handleToggle()}>
        <View
          style={StyleSheet.flatten([
            styles.container,
            this.state.toggled && styles.containerToggled,
          ])}
        >
          <Animated.View
            style={StyleSheet.flatten([
              styles.slide,
              {
                right: this.rightPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [RIGHT_POS_ACTIVE, RIGHT_POS_INACTIVE]
                }),
              }
            ])}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Toggle.defaultProps = {
  toggled: false,
  onToggle: () => null,
}

export default Toggle

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 48,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
  },
  containerToggled: {
    backgroundColor: '#81E397',
  },
  slide: {
    position: 'absolute',
    top: 2,
    right: 26,
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
})
