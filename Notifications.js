import React                  from 'react'
import {View}                 from 'react-native'
import {connect}              from 'react-redux'
import notificationComponents from '../lib/notifications/notificationComponents'

class Notifications extends React.Component {
  render() {
    return (
      <View>
        {this.props.notifications.map(notification => {
          const NotificationComponent = notificationComponents[notification.id]
          return (
            <NotificationComponent
              key={notification.id}
              id={notification.id}
              notification={notification.notification}
              params={notification.params}
            />
          )
        })}
      </View>
    )
  }
}

const mapStateToProps = ({notifications: notificationsStore}) => ({
  notifications: notificationsStore.notifications,
})

export default connect(mapStateToProps)(Notifications)
