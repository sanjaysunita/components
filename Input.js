import React                        from 'react'
import {View, StyleSheet}           from 'react-native'
import {Icon, Input as NativeInput} from 'react-native-elements'
import {connect}                    from 'react-redux'
import {bindActionCreators}         from 'redux'
import {scrollTo}                   from '../redux/actions/global'

const inputProps = (type, props, state, setState) => {
  const inputProps = {
    text: {},
    user: {
      autoCompleteType: 'username',
      textContentType: 'username',
      autoCapitalize: 'none',
    },
    paragraph: {
      multiline: true,
      numberOfLines: 6,
      textAlignVertical: 'top',
      onContentSizeChange: (event) => {
        setState({height: event.nativeEvent.contentSize.height})
      }
    },
    name: {
      autoCompleteType: 'name',
      textContentType: 'name',
      autoCorrect: false,
      autoCapitalize: 'words',
    },
    email: {
      autoCompleteType: 'email',
      textContentType: 'emailAddress',
      autoCorrect: false,
      autoCapitalize: 'none',
    },
    phone: {
      autoCompleteType: 'tel',
      textContentType: 'telephoneNumber',
      autoCorrect: false,
      autoCapitalize: 'none',
    },
    password: {
      autoCompleteType: 'password',
      textContentType: 'password',
      autoCorrect: false,
      autoCapitalize: 'none',
      secureTextEntry: state.hidePassword,
      rightIcon: () => (
        <Icon
          name={state.hidePassword ? 'visibility' : 'visibility-off'}
          onPress={() => setState(prevState => ({hidePassword: !prevState.hidePassword}))}
        />
      )
    },
  }[type]

  Object.keys(props).forEach((prop) => {
    if (props[prop] !== undefined) {
      inputProps[prop] = props[prop]
    }
  })

  return inputProps
}

class Input extends React.Component {
  state = {
    height: 0,
    hidePassword: true,
  }

  render() {
    const {
            type                = 'text',
            placeholder         = '',
            autoFocus           = false,
            onChange,
            value,
            autoCompleteType,
            textContentType,
            autoCorrect,
            autoCapitalize,
            multiline,
            numberOfLines,
            textAlignVertical,
            paragraphAutoHeight = false,
            style,
            inputStyle          = {},
            containerStyle      = {},
            ...passThroughProps
          } = this.props
    return (
      <View
        renderToHardwareTextureAndroid={true}
        style={style}
      >
        <NativeInput
          inputStyle={StyleSheet.flatten([
            styles[`${type}Input`],
            inputStyle,
            (type === 'paragraph' && paragraphAutoHeight) && {height: Math.max(35, this.state.height)}
          ])}
          labelStyle={StyleSheet.flatten([
            styles.labelStyle,
            passThroughProps.labelStyle,
          ])}
          containerStyle={containerStyle}
          placeholder={placeholder}
          autoFocus={autoFocus}
          value={value}
          onChangeText={onChange}
          {...inputProps(type, {
            autoCompleteType,
            textContentType,
            autoCorrect,
            autoCapitalize,
            multiline,
            numberOfLines,
            textAlignVertical,
          }, this.state, this.setState.bind(this))}
          {...passThroughProps}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {},
  emailInput: {},
  nameInput: {},
  phoneInput: {},
  paragraphInput: {
    height: 192,
  },
  labelStyle: {
    marginBottom: 12,
  },
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    scrollTo,
  }, dispatch)
)

export default connect(null, mapDispatchToProps)(Input)
