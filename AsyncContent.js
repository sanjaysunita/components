import React          from 'react'
import {View}         from 'react-native'
import LoadingSpinner from './LoadingSpinner'
import Alert          from './Alert'

export default class extends React.Component {
  render() {
    const {loading, error, children, style} = this.props
    return (
      <View style={style}>
        {/* CONTENT */}
        {(!loading && !error) && (
          children
        )}

        {/* LOADING */}
        {loading && (
          <LoadingSpinner
            style={{marginLeft: 'auto', marginRight: 'auto', marginVertical: 16}}
          />
        )}

        {/* ERROR */}
        {error && (
          <Alert message={error}/>
        )}
      </View>
    )
  }
}
