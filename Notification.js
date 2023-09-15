import React                 from 'react'
import {StyleSheet}          from 'react-native'
import {bindActionCreators}  from 'redux'
import {connect}             from 'react-redux'
import Overlay               from './Overlay'
import {dismissNotification} from '../redux/actions/notifications'
import {colors}              from '../theme'

class Notification extends React.Component {
  state = {
    isVisible: true,
  }

  handleClose() {
    this.setState({isVisible: false}, async () => {
      await this.props.dismissNotification(this.props.id)
      this.props.onDismiss && this.props.onDismiss()
    })
  }

  render() {
    const {
            children,
            style,
            confetti = false,
          } = this.props
    return (
      <Overlay
        isVisible={this.state.isVisible}
        hasAction={false}
        overlayContainerStyle={styles.overlayContainer}
        overlayStyle={StyleSheet.flatten([
          styles.overlay,
          style,
        ])}
        onClosePress={() => this.handleClose()}
        confetti={confetti}
      >
        {children}
      </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    flexDirection: 'column',
  },
  overlayContainer: {
    backgroundColor: colors.superLightBlue,
  },
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    dismissNotification,
  }, dispatch)
)

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(Notification)
