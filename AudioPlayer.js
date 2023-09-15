import React                        from 'react'
import {AppState, StyleSheet, View} from 'react-native'
import {Audio}                      from 'expo-av'
import Button                       from './Button'
import LoadingSpinner               from './LoadingSpinner'
import IconButton                   from './IconButton'
import {
  INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
  INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
}                                   from 'expo-av/src/Audio'

export default class extends React.Component {
  state = {
    playing: false,
    loading: true,
    error: null,
  }

  togglePlaying() {
    if (this.state.playing) {
      this.stopAudio()
    } else {
      this.playAudio()
    }
  }

  async unloadAudio() {
    try {
      await this.soundObject.unloadAsync()
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  async stopAudio() {
    try {
      this.setState({playing: false})
      await this.soundObject.pauseAsync()
    } catch (error) {
      this.setState({
        error: error.message,
      })
    }
  }

  async playAudio() {
    try {
      this.setState({playing: true})
      await this.soundObject.replayAsync()
    } catch (error) {
      this.setState({
        error: error.message,
      })
    }
  }

  async updateAudioStatus(playbackStatus) {
    if (!playbackStatus.isLoaded) {
      if (playbackStatus.error) {
        this.setState({error: playbackStatus.error})
      }
    } else {
      if (playbackStatus.didJustFinish) {
        this.setState({playing: false})
        this.stopAudio()
      }
    }
  }

  async loadAudio() {
    try {
      this.soundObject = new Audio.Sound()

      this.setState({
        loading: true,
        error: false,
      })

      await this.soundObject.loadAsync({uri: this.props.source})
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
      })
      this.soundObject.setOnPlaybackStatusUpdate(this.updateAudioStatus.bind(this))

      this.setState({
        loading: false,
      })
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      })
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this))
    this.unloadAudio()
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange.bind(this))
    this.loadAudio()
  }

  _handleAppStateChange(nextAppState) {
    switch (nextAppState) {
      case 'inactive':
      case 'background':
        this.stopAudio()
        break;
    }
  }

  render() {
    const {
            color             = '#A7B1CC',
            type              = 'icon',
            buttonTextStopped = 'Play Audio',
            buttonTextPlaying = 'Pause Audio',
            loadingSpinnerStyle,
          } = this.props
    return (
      <View>
        {this.state.loading ? (
          <LoadingSpinner
            size={24}
            style={StyleSheet.flatten([
              styles.loadingSpinner,
              loadingSpinnerStyle,
            ])}
          />
        ) : (
          type === 'icon' ? (
            <IconButton
              name={this.state.playing ? 'mute' : 'speaker'}
              color={color}
              background="transparent"
              onPress={() => this.togglePlaying()}
            />
          ) : (
            <Button
              title={this.state.playing ? buttonTextPlaying : buttonTextStopped}
              onPress={() => this.togglePlaying()}
            />
          )
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loadingSpinner: {
    marginTop: 9,
    marginLeft: 9,
  },
})
