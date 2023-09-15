import React                    from 'react'
import {StyleSheet, Text, View} from 'react-native'
import IconStyled               from './IconStyled'
import {colors}                 from '../theme'

export default class PasswordRequirements extends React.Component {
  state = {
    validators: [],
  }

  getValidators() {
    const {password = ''} = this.props
    return [
      {
        id: 'minLength',
        description: 'Must be at least 8 characters',
        valid: password.length >= 8,
      },
      {
        id: 'includesUpper',
        description: 'Must include at least 1 uppercase letter',
        valid: /[A-Z]/.test(password),
      },
      {
        id: 'includesLower',
        description: 'Must include at least 1 lowercase letter',
        valid: /[a-z]/.test(password),
      },
      {
        id: 'includesSpecial',
        description: 'Must include at least 1 special character',
        valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      },
      {
        id: 'includesNumbers',
        description: 'Must include at least 1 number',
        valid: /[0-9]/.test(password),
      },
    ]
  }

  isValid() {
    return this.state.validators.reduce(
      (isValid, validator) => !isValid || !validator.valid ? false : isValid,
      true
    )
  }

  setValidators() {
    const validators = this.getValidators()
    this.setState({validators}, () => {
      if (this.props.onSuccess && this.isValid()) {
        this.props.onSuccess()
      } else if (this.props.onFail) {
        this.props.onFail()
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.password !== this.props.password) {
      this.setValidators()
    }
  }

  componentDidMount() {
    this.setValidators()
  }

  render() {
    const validators = this.getValidators()
    return (
      <View style={styles.container}>
        {validators.map(validator => (
          <View
            style={styles.requirementRow}
            key={validator.id}
          >
            <IconStyled
              name={validator.valid ? 'check' : 'times'}
              size={14}
              background={validator.valid ? colors.success : colors.error}
              color="#ffffff"
              style={styles.icon}
            />
            <Text>
              {validator.description}
            </Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  requirementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
})
