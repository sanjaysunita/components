import React from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'
import {Text} from 'react-native-elements'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import Icon from './Icon'
import {colors} from '../theme'

class BottomNavigation extends React.Component {
  render() {
    const menuItems = [
      {
        id: 'home',
        name: 'Home',
        icon: 'home',
        route: 'Dashboard',
      },
      {
        id: 'progress',
        name: 'Progress',
        icon: 'progress',
        route: 'Progress',
      },
      {
        id: 'resources',
        name: 'Resources',
        icon: 'resources',
        route: 'Resources',
      },
    ]
    const currentRoute = this.props.navigation.state.routeName
    const hasUnread = this.props.unreadMessages.length > 0
    return (
      <View style={styles.container}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemContainer}
            onPress={() => this.props.navigation.navigate(item.route)}
          >
            <View style={styles.iconSection}>
              <View style={styles.iconContainer}>
                <Icon
                  name={item.icon}
                  color={currentRoute === item.route ? colors.primary : '#7D8CB0'}
                  size={32}
                  style={styles.icon}
                />

                { /* UNREAD MESSAGES ICON */}
                {(item.icon === 'resources' && hasUnread) && (
                  <Icon
                    name="dot"
                    color={colors.error}
                    size={12}
                    style={styles.unreadMessagesIcon}
                  />
                )}
              </View>
            </View>

            <Text
              style={StyleSheet.flatten([
                styles.itemText,
                currentRoute === item.route && { color: colors.primary },
              ])}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemContainer: {
    justifyContent: 'center',
    width: 100,
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 6,
  },
  itemText: {
    marginBottom: 0,
    color: '#7D8CB0',
    textAlign: 'center',
    fontSize: 14,
  },
  unreadMessagesIcon: {
    position: 'absolute',
    top: -2,
    right: -2,
  },
  iconSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconContainer: {
    flexGrow: 0,
  },
})

const mapStateToProps = ({user: userStore}) => ({
  unreadMessages: userStore.unreadMessages,
})

export default connect(mapStateToProps)(withNavigation(BottomNavigation))
