import React           from 'react'
import {Linking, View} from 'react-native'
import qs              from 'qs'
import Alert           from './Alert'
import Icon            from './Icon'
import Button          from './Button'
import {colors}        from '../theme'

export default class HelpButton extends React.Component {
  state = {
    error: null,
  }

  async handleOpenEmail() {
    let url = 'mailto:support@expyhealth.com?' + qs.stringify({
      subject: 'Expy Health Support Request',
    })

    try {
      await Linking.openURL(url)
    } catch (error) {
      this.setState({error: error.message})
    }
  }

  render() {
    const {buttonType} = this.props
    const {error}      = this.state
    return (
      <View>
        {!error ? (
          <Button
            title="Click here for help"
            type={buttonType}
            icon={
              <Icon
                name="help-chat"
                color={buttonType === 'clear' ? colors.primary : '#ffffff'}
                style={{marginRight: 8}}
              />
            }
            buttonStyle={{width: '100%'}}
            onPress={() => this.handleOpenEmail()}
          />
        ) : (
          <Alert
            message="Could not open email application. Please try manually emailing us at support@expyhealth.com"/>
        )}
      </View>
    )
  }
}
