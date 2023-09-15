import React from 'react'
import {bindActionCreators} from 'redux'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {logOut} from '../utils/user'
import {fetchUnreadMessages, userLogOut} from '../redux/actions/user'
import {userOrganizationRole} from '../redux/getters/user'
import {setApiListenerStatus} from '../redux/actions/global'

class ApiListener extends React.Component {
  state = {
    loggingOut: false,
    isListening: false,
  }

  async checkStatus() {
    // Unauthorized, send back to login
    if (this.props.api.status >= 401 && this.props.api.status < 402) {
      this.setState({ loggingOut: true })
      await logOut(this.props, { message: 'Session expired. Please log in again.' })
    }

    // Failed network request, send back to login
    if (this.props.api.status === 500) {
      this.setState({ loggingOut: true })
      this.props.navigation.navigate('Error', { errorMessage: this.props.api.error })
    }
  }

  componentDidUpdate() {
    if (this.props.apiListenerStatus !== 'listening') {
      if (!this.state.loggingOut && Date.now() > this.props.api.lastUpdated) this.checkStatus()
    }
  }

  componentDidMount() {
    if (this.props.apiListenerStatus !== 'listening') {
      this.props.setApiListenerStatus('listening')

      // Unread messages interval (10 sec)
      if (this.unreadMessagesInterval) clearInterval(this.unreadMessagesInterval)
      this.unreadMessagesInterval = setInterval(() => {
        if (this.props.user) {
          this.props.fetchUnreadMessages(userOrganizationRole(this.props.user).id)
        }
      }, 10000)
    }
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = ({ global: globalStore, user: userStore }) => ({
  api: globalStore.api,
  apiListenerStatus: globalStore.apiListenerStatus,
  user: userStore.user,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    userLogOut,
    fetchUnreadMessages,
    setApiListenerStatus,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ApiListener))
