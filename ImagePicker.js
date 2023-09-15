import React                  from 'react'
import {StyleSheet, View}     from 'react-native'
import {Text}                 from 'react-native-elements'
import * as ImagePickerNative from 'expo-image-picker'
import Alert                  from './Alert'
import IconButton             from './IconButton'
import Image                  from './Image'
import {colors}               from '../theme'

export default class ImagePicker extends React.Component {
  state = {
    askingForLocation: false,
    permissionDenied: false,
    fileData: null,
    prevFileData: null,
  }

  async checkForCameraRollPermissions() {
    const permissions = await ImagePickerNative.getCameraRollPermissionsAsync()
    if (permissions.status !== 'granted') {
      await ImagePickerNative.requestCameraRollPermissionsAsync()
      return await ImagePickerNative.getCameraRollPermissionsAsync()
    }
    return permissions
  }

  async checkForCameraPermissions() {
    const permissions = await ImagePickerNative.getCameraPermissionsAsync()
    if (permissions.status !== 'granted') {
      await ImagePickerNative.requestCameraPermissionsAsync()
      return await ImagePickerNative.getCameraPermissionsAsync()
    }
    return permissions
  }

  async handleFromCameraRoll() {
    const permissions = await this.checkForCameraRollPermissions()
    if (permissions.status !== 'granted') {
      this.setState({permissionDenied: true})
      return
    }
    this.addPhoto(await ImagePickerNative.launchImageLibraryAsync())
  }

  async handleFromCamera() {
    const permissions = await this.checkForCameraPermissions()
    if (permissions.status !== 'granted') {
      this.setState({permissionDenied: true})
      return
    }
    this.addPhoto(await ImagePickerNative.launchCameraAsync())
  }

  handleChangePhoto() {
    this.setState(prevState => ({
      askingForLocation: true,
      previewSource: null,
      prevFileData: prevState.fileData,
      fileData: null,
    }))
  }

  handleRemovePhoto() {
    this.setState({
      fileData: null,
      askingForLocation: null,
      previewSource: null,
      initialPreviewSource: null,
    }, () => {
      this.props.onRemove()
    })
  }

  handleCancelChangePhoto() {
    this.setState(prevState => ({
      fileData: prevState.prevFileData,
      previewSource: (prevState.prevFileData && prevState.prevFileData.uri) || prevState.initialPreviewSource,
      prevFileData: null,
      askingForLocation: false,
    }))
  }

  addPhoto({cancelled, uri}) {
    if (cancelled) {
      this.setState({askingForLocation: true})
      return
    }

    const filename = uri.split('/').pop()
    const uriParts = uri.split('.')
    const fileType = uriParts[uriParts.length - 1]

    let formData = new FormData()
    formData.append('file', {
      uri,
      path: uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    })

    const fileData = {
      uri,
      filename,
      type: fileType,
      formData,
    }

    this.setState(prevState => ({
      fileData,
      previewSource: fileData.uri,
    }), () => {
      this.props.onChange(fileData)
    })
  }

  componentDidMount() {
    if (this.props.value) {
      this.setState({
        previewSource: this.props.value,
        initialPreviewSource: this.props.value,
      })
    }
  }

  render() {
    const {
            label,
            skipInitialState = false,
            showPreview      = true,
            buttonTextAdd    = 'Add photo',
            buttonAddIcon    = 'camera',
            previewImageMaxWidth,
            previewImageMaxHeight,
            disabled,
            style,
            onRemove,
          } = this.props
    const {
            askingForLocation,
            permissionDenied,
            fileData,
            prevFileData,
            previewSource,
          } = this.state
    return (
      <View style={style}>
        {!!label && (
          <Text style={styles.fieldLabelText}>
            {label}
          </Text>
        )}

        {(!previewSource && !fileData && !permissionDenied && !askingForLocation && !skipInitialState) && (
          <View style={styles.buttonContainer}>
            <IconButton
              name={buttonAddIcon}
              color={colors.primary}
              onPress={() => this.setState({askingForLocation: true})}
              style={styles.buttonIcon}
              disabled={disabled}
            />
            <Text style={styles.buttonText}>
              {buttonTextAdd}
            </Text>
          </View>
        )}

        {(!fileData && !permissionDenied && (askingForLocation || skipInitialState)) && (
          <View>
            <View style={styles.buttonContainer}>
              <IconButton
                name="media"
                color={colors.primary}
                onPress={() => this.handleFromCameraRoll()}
                style={styles.buttonIcon}
                disabled={disabled}
              />
              <Text style={styles.buttonText}>
                Gallery
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <IconButton
                name="camera"
                color={colors.primary}
                onPress={() => this.handleFromCamera()}
                style={styles.buttonIcon}
                disabled={disabled}
              />
              <Text style={styles.buttonText}>
                Camera
              </Text>
            </View>
            {!!prevFileData && (
              <View style={styles.buttonContainer}>
                <IconButton
                  name="times"
                  color={colors.primary}
                  onPress={() => this.handleCancelChangePhoto()}
                  style={styles.buttonIcon}
                  disabled={disabled}
                />
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </View>
            )}
          </View>
        )}

        {!!previewSource && (
          <View>
            {showPreview && (
              <Image
                source={previewSource}
                resizeMode="cover"
                maxWidth={previewImageMaxWidth}
                maxHeight={previewImageMaxHeight}
                style={styles.previewImage}
              />
            )}
            <View style={styles.buttonContainer}>
              <IconButton
                name="change"
                color={colors.primary}
                onPress={() => this.handleChangePhoto()}
                style={styles.buttonIcon}
                disabled={disabled}
              />
              <Text style={styles.buttonText}>
                Change
              </Text>
            </View>
            {onRemove !== undefined && (
              <View style={styles.buttonContainer}>
                <IconButton
                  name="trash"
                  color={colors.primary}
                  onPress={() => this.handleRemovePhoto()}
                  style={styles.buttonIcon}
                  disabled={disabled}
                />
                <Text style={styles.buttonText}>
                  Remove
                </Text>
              </View>
            )}
          </View>
        )}

        {permissionDenied && (
          <Alert
            message="Could not get camera or camera roll permissions. Please go to Settings and allow this app access to the camera or the camera roll"/>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fieldLabelText: {
    fontSize: 17,
    lineHeight: 17,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    marginBottom: 0,
    color: colors.primary,
    fontSize: 16,
  },
  previewImage: {
    marginBottom: 16,
  },
})
