import React               from 'react'
import {Animated, Easing}  from 'react-native'
import {Svg, Path, Circle} from 'react-native-svg'
import {ScreenWidth}       from '../helpers'
import {StyleSheet, View}  from 'react-native'
import {Text}              from 'react-native-elements'

class AnimatedSvgCircle extends React.Component {
  setNativeProps = (props) => {
    this._component && this._component.setNativeProps(props);
  }
  render() {
    return (
      <Circle
        ref={component => (this._component = component)}
        {...this.props}
      />
    );
  }
}
AnimatedSvgCircle = Animated.createAnimatedComponent(AnimatedSvgCircle);

class BreathingIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.animator = new Animated.Value(0)
  }

  animateGrow() {
    const {animateStyleBreathing = true} = this.props
    this.animator.setValue(0)
    Animated.timing(
      this.animator,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
      }
    ).start(() => setTimeout(() => this.animateShrink(), animateStyleBreathing ? 2000 : 0))
  }

  animateShrink() {
    this.animator.setValue(1)
    Animated.timing(
      this.animator,
      {
        toValue: 0,
        duration: 6000,
        easing: Easing.inOut(Easing.ease),
      }
    ).start(() => this.animateGrow())
  }

  getBreathingText() {
    const current = (this.props.currentTime + 12) % 12
    if (current <= 3) return 'Inhale'
    if (current === 4) return 'Hold 2'
    if (current === 5) return 'Hold 1'
    if (current >= 6) return 'Slowly Exhale'
  }

  componentDidMount() {
    this.animateGrow()
  }

  render() {
    const baseSize     = ScreenWidth - 32
    const differential = 1.0224719101 // generated proportion from the original SVG height/width

    // generated from original SVG
    const oblongPath = [
      {n: 1, prefix: 'M'},
      [{n: .49363265}, {n: 1, prefix: 'C'}],
      {n: .78330320},
      {n: .81195043},
      {n: 1.02100874},
      {n: .52239067},
      [{n: 1.02100874}, {n: .23283294, prefix: 'C'}],
      {n: 1.02100874},
      {n: -0.04507230},
      {n: 0.65662390},
      {n: .00613393},
      [{n: .32831486}, {n: .03639241, prefix: 'C'}],
      {n: .05122653},
      {n: .217},
      {n: .02295530, postfix: 'e-05'},
      {n: .50655685},
      [{n: .02295530, postfix: 'e-05'}, {n: .79611661, prefix: 'C'}],
      {n: .02295530, postfix: 'e-05'},
      {n: 1},
      {n: .20396355},
      {n: 1},
      {n: .49363265, postfix: 'Z'},
    ].reduce((pathString, point) => {
      const getPointString = (p) => {
        let string = ''
        const n    = p.n * baseSize
        if (p.prefix) string = p.prefix
        string += n
        if (p.postfix) string += p.postfix
        return string
      }
      if (Array.isArray(point)) {
        return pathString + point.reduce((pointString, _point) => pointString + getPointString(_point), '') + ' '
      } else {
        return pathString + getPointString(point) + ' '
      }
    }, '')

    const radiusA = this.animator.interpolate({
      inputRange: [0, 1],
      outputRange: [(baseSize / 2) * .8, (baseSize / 2) * .9]
    })
    const radiusB = this.animator.interpolate({
      inputRange: [0, 1],
      outputRange: [(baseSize / 2) * .7, (baseSize / 2) * .85]
    })
    const {showText = true, children} = this.props
    return (
      <View>
        <Svg
          height={baseSize * differential}
          width={baseSize}
        >
          <Path
            d={oblongPath}
            fill="#E1F6FB"
          />
          <AnimatedSvgCircle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radiusA}
            fill="#BFE8F6"
          />
          <AnimatedSvgCircle
            cx={baseSize / 2}
            cy={baseSize / 2}
            r={radiusB}
            fill="#8CD2EE"
          />
        </Svg>
        {showText && (
          <View style={StyleSheet.flatten([
            styles.breathingTextContainer,
            {
              width: baseSize,
              height: baseSize * differential,
            }
          ])}>
            {children}
            {!children && (
              <Text style={styles.breathingText}>
                {this.getBreathingText()}
              </Text>
            )}
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  breathingTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    top: 0,
    left: 0,
  },
  breathingText: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
})

export default BreathingIndicator
