import React                  from 'react'
import {StyleSheet, View}     from 'react-native'
import {Slider, Text}         from 'react-native-elements'
import {bindActionCreators}   from 'redux'
import {connect}              from 'react-redux'
import Overlay                from './Overlay'
import Button                 from './Button'
import IconStyled             from './IconStyled'
import {submitPainSurvey}     from '../redux/actions/dashboard'
import {userOrganizationRole} from '../redux/getters/user'
import {colors}               from '../theme'

class PainSurvey extends React.Component {
  state = {
    level: 0,
  }

  async handleSubmitPainSurvey() {
    await this.props.submitPainSurvey({
      userOrganizationRoleId: userOrganizationRole(this.props.user).organization_role_id,
      level: this.state.level,
    })
    this.props.onSubmit({
      error: this.props.error,
      level: this.state.level,
      levelText: this.getLevelText(this.state.level),
    })
  }

  getLevelText(level) {
    let painLevelText
    if (level === 0) painLevelText = 'No Pain'
    if (level >= 1 && level < 3) painLevelText = 'Mild Pain'
    if (level >= 3 && level < 5) painLevelText = 'Moderate Pain'
    if (level >= 5 && level < 7) painLevelText = 'Severe Pain'
    if (level >= 7 && level < 9) painLevelText = 'Very Severe Pain'
    if (level >= 9) painLevelText = 'Worst Pain Possible'
    return painLevelText
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.setState({level: 0})
    }
  }

  render() {
    const {onCancel = undefined} = this.props
    const painLevelText          = this.getLevelText(this.state.level)

    // Slide color
    let painLevelSlideColor
    if (this.state.level <= 2) painLevelSlideColor = '#42a347'
    if (this.state.level >= 3 && this.state.level <= 5) painLevelSlideColor = '#FFDE8A'
    if (this.state.level >= 6) painLevelSlideColor = '#FF948A'
    return (
      <Overlay
        isVisible={this.props.isVisible}
        hasAction={false}
        dismissible={false}
      >
        <View style={styles.painOverlayContainer}>
          <Text
            h1
            h1Style={{textAlign: 'center', marginBottom: 4}}
          >
            Rate your pain
          </Text>
          <Text style={{textAlign: 'center'}}>
            On a scale of <Text style={{fontWeight: 'bold'}}>0 - 10</Text>
          </Text>
          <IconStyled
            name="dot"
            background="#FFF4F3"
            color="#FF948A"
            size={64}
            square
            style={{marginLeft: 'auto', marginRight: 'auto'}}
          />
          <Text style={styles.painRatingText}>{this.state.level}</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor={painLevelSlideColor}
            thumbTintColor="#ffffff"
            style={styles.painSlider}
            trackStyle={styles.painSliderTrack}
            thumbStyle={styles.painSliderThumb}
            value={this.state.level}
            onValueChange={level => this.setState({level})}
          />
          <Text style={styles.painLevelDescriptionText}>
            {painLevelText}
          </Text>
          <View style={{marginTop: 'auto'}}>
            <Button
              title="Done"
              onPress={() => this.handleSubmitPainSurvey()}
            />
            {!!onCancel && (
              <Button
                title="Cancel"
                type="clear"
                containerStyle={{marginBottom: 0}}
                buttonStyle={{marginBottom: 0}}
                onPress={() => onCancel()}
              />
            )}
          </View>
        </View>
      </Overlay>
    )
  }
}

const styles = StyleSheet.create({
  painOverlayContainer: {
    width: '100%',
  },
  painRatingText: {
    textAlign: 'center',
    fontSize: 40,
    lineHeight: 46,
    fontWeight: '500',
    marginVertical: 32,
  },
  painSlider: {
    marginVertical: 16,
  },
  painSliderTrack: {
    height: 16,
    borderRadius: 100,
  },
  painSliderThumb: {
    height: 52,
    width: 52,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: colors.primary,
  },
  painLevelDescriptionText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 24,
  },
})

const mapStateToProps = ({user: userStore, dashboard: dashboardStore}) => ({
  // USER
  user: userStore.user,
  // PAIN SURVEY
  submitting: dashboardStore.submittingPainSurvey,
  error: dashboardStore.submittingPainSurveyError,
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    submitPainSurvey,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PainSurvey)
