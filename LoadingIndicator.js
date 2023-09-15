import React                    from 'react'
import {StyleSheet, Text, View} from 'react-native'
import LoadingSpinner           from './LoadingSpinner'

export default ({children}) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {children}
    </Text>
    <LoadingSpinner/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    marginBottom: 32,
  },
})
