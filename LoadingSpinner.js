import React                          from 'react'
import {StyleSheet, Animated, Easing} from 'react-native'
import LoadingBackSvg                 from '../assets/loading-back.svg'
import LoadingFillSvg                 from '../assets/loading-fill.svg'

export default class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }
    ).start(() => this.spin())
  }

  render() {
    const {size = 64} = this.props
    const spin        = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.View
        style={StyleSheet.flatten([
          this.props.style,
          {
            transform: [{rotate: spin}],
            width: size,
            height: size,
          },
        ])}
      >
        <LoadingBackSvg
          width={size}
          height={size}
        />
        <LoadingFillSvg
          width={size / 2}
          height={size * 0.765625}
          style={{
            position: 'absolute',
            left: size / 2,
          }}
        />
      </Animated.View>
    )
  }
}
