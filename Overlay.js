import React         from 'react'
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
}                    from 'react-native'
import Section       from './Section'
import Button        from './Button'
import IconStyled    from './IconStyled'
import {ScreenWidth} from '../helpers'

// TODO Overlay close button not working

export default (
  {
    isVisible = true,
    height,
    onBackdropPress,
    onClosePress,
    onAction,
    hasAction = true,
    dismissible = true,
    actionText = 'Save Changes',
    confetti = false,
    children,
    overlayStyle,
    overlayContainerStyle,
  }
) => (
  <Modal
    visible={isVisible}
    onRequestClose={onBackdropPress}
    transparent
  >
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <Section
        confetti={confetti}
        style={styles.backdrop}
      />
    </TouchableWithoutFeedback>

    {dismissible && (
      <TouchableOpacity
        onPress={onClosePress}
        style={styles.closeButton}
      >
        <IconStyled
          name="times"
          background="transparent"
          color="#ffffff"
          size={32}
        />
      </TouchableOpacity>
    )}

    <View
      style={styles.container}
      pointerEvents="box-none"
    >
      <View
        style={StyleSheet.flatten([
          styles.overlay,
          {
            width: ScreenWidth - 40,
            paddingBottom: hasAction ? 0 : 32,
          },
          height && {height},
          overlayContainerStyle,
        ])}
      >
        <View
          style={StyleSheet.flatten([
            styles.overlayContainer,
            overlayStyle,
          ])}
        >
          {children}
        </View>
        {hasAction && (
          <Button
            onPress={onAction}
            title={actionText}
            type="clear"
            buttonStyle={styles.actionButton}
          />
        )}
      </View>
    </View>
  </Modal>
)

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, .75)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  overlay: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: {width: 0, height: 1},
        shadowRadius: 4,
      },
    }),
  },
  overlayContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  actionButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#DADADA',
  },
})
