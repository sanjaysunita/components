import React                     from 'react'
import {View, Image, StyleSheet} from 'react-native'
import LoadingSpinner            from './LoadingSpinner'
import Alert                     from './Alert'
import {ScreenWidth}             from '../helpers'

export default class extends React.Component {
  state = {
    width: 200,
    height: 200,
    loading: true,
    error: null,
  }

  componentDidMount() {
    Image.getSize(this.props.source, (width, height) => {
      this.setState({width, height, loading: false})
    }, (error) => {
      this.setState({error: error.message, loading: false})
    })
  }

  render() {
    const {
            width,
            height,
            loading,
            error,
          }          = this.state
    const {
            maxHeight,
            maxWidth = ScreenWidth - 32,
            resizeMode,
          }          = this.props
    const dimensions = {width: 200, height: 200}
    if (width || !height) {
      dimensions.width = Math.min(width, maxWidth)
      const resizing   = width - dimensions.width
      if (resizing > 0) {
        dimensions.height = Math.round((dimensions.width / width) * height)
      } else {
        dimensions.height = height
      }
    }
    if (maxHeight && dimensions.height > maxHeight) {
      dimensions.width  = Math.round((maxHeight / dimensions.height) * dimensions.width)
      dimensions.height = maxHeight
    }
    return (
      <View style={StyleSheet.flatten([dimensions, this.props.style])}>
        <Image
          source={{uri: this.props.source}}
          resizeMode={resizeMode}
          style={StyleSheet.flatten([
            dimensions,
            this.props.imageStyle,
            {opacity: this.state.loading ? 0 : 1}
          ])}
        />
        {(!error && loading) && (
          <View style={styles.spinnerContainer}>
            <LoadingSpinner/>
          </View>
        )}
        {error && (
          <Alert message={error}/>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -32,
    marginTop: -32,
  }
})
