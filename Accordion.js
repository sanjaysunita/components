import React              from 'react'
import {StyleSheet, View} from 'react-native'
import ListItem           from './ListItem'
import IconButton         from './IconButton'
import {colors}           from '../theme'

export default class extends React.Component {
  state = {
    isExpanded: false,
  }

  componentDidMount() {
    if (this.props.expanded) {
      this.setState({isExpanded: true})
    }
  }

  render() {
    const {
            title,
            disabled              = false,
            children,
            style                 = {},
            contentContainerStyle = {},
            ...passThroughProps
          } = this.props
    return (
      <ListItem
        {...passThroughProps}
        style={StyleSheet.flatten([styles.container, style])}
      >
        <View
          style={StyleSheet.flatten([
            styles.titleContainer,
            this.state.isExpanded && styles.titleContainerActive
          ])}
        >
          {title}
          {!disabled && (
            <IconButton
              name={this.state.isExpanded ? 'chevron-up' : 'chevron-down'}
              color={colors.primary}
              background="transparent"
              onPress={() => this.setState(prevState => ({isExpanded: !prevState.isExpanded}))}
            />
          )}
        </View>
        {this.state.isExpanded && (
          <View
            style={StyleSheet.flatten([
              styles.contentContainer,
              contentContainerStyle,
            ])}
          >
            {children}
          </View>
        )}
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  titleContainerActive: {
    backgroundColor: '#E6F6F7',
  },
})
