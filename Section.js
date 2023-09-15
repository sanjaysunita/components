import React                          from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'
import Confetti                       from 'react-native-confetti'

export default class Section extends React.Component {
  _scrollView = React.createRef()

  state = {
    lastScroll: 0,
    scrollY: 0,
  }

  handleScroll(event) {
    this.setState({
      scrollY: event.nativeEvent.contentOffset.y,
      scrollX: event.nativeEvent.contentOffset.x,
    })
  }

  componentDidUpdate() {
    const lastScroll = Date.now()
    // Scroll To
    if (
      this.props.scrollTo &&
      this._scrollView &&
      this._scrollView.current &&
      this.state.lastScroll < lastScroll
    ) {
      const {
              x         = 0,
              y         = 0,
              relativeX = null,
              relativeY = null,
              animated  = true,
            } = this.props.scrollTo
      this.setState({lastScroll})
      this._scrollView.current.scrollTo({
        y: relativeY ? this.state.scrollY + relativeY : y,
        x: relativeX ? this.state.scrollX + relativeX : x,
        animated,
      })
    }
  }

  componentDidMount() {
    if (this._confettiView) {
      this._confettiView.startConfetti()
    }
  }

  componentWillUnmount() {
    if (this._confettiView) {
      this._confettiView.stopConfetti()
    }
  }

  render() {
    const {
            children,
            roundedTop    = false,
            roundedBottom = false,
            background    = false,
            fullHeight    = false,
            scrollable    = false,
            confetti      = false,
            style,
            containerStyle,
          } = this.props

    const dynamicStyles = {}
    if (roundedTop) {
      dynamicStyles.borderTopLeftRadius  = 16
      dynamicStyles.borderTopRightRadius = 16
    }
    if (roundedBottom) dynamicStyles.borderBottomLeftRadius = dynamicStyles.borderBottomRightRadius = 16
    if (background) dynamicStyles.backgroundColor = background
    if (fullHeight) dynamicStyles.flex = 1

    if (scrollable) {
      return (
        <View
          style={StyleSheet.flatten([
            dynamicStyles,
            containerStyle,
          ])}
        >
          <ScrollView
            ref={this._scrollView}
            scrollEventThrottle={100}
            onScroll={event => this.handleScroll(event)}
            style={StyleSheet.flatten([
              styles.container,
              style,
            ])}
          >
            {children}
            {confetti && (
              <Confetti ref={component => this._confettiView = component}/>
            )}
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View
          style={StyleSheet.flatten([
            styles.container,
            dynamicStyles,
            style,
          ])}
        >
          {children}
          {confetti && (
            <Confetti ref={component => this._confettiView = component}/>
          )}
        </View>
      )
    }
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  }
})
