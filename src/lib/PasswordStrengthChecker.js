

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
  ViewPropTypes,
  TouchableOpacity
} from 'react-native'
import zxcvbn from 'zxcvbn'
import _ from 'lodash'
import CustomTextInput from '../scenes/components/CustomTextInput'
import { moderateScale } from '../utils/Scaling'
import Color from '../utils/Color'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../scenes/components/CustomText'

const { width: wWidth } = Dimensions.get('window')

const widthByPercent = (percentage, containerWidth = wWidth) => {
  const value = percentage * containerWidth / 100
  return Math.round(value)
}

const regex = {
  digitsPattern: /\d/,
  lettersPattern: /[a-zA-Z]/,
  lowerCasePattern: /[a-z]/,
  upperCasePattern: /[A-Z]/,
  wordsPattern: /\w/,
  symbolsPattern: /\W/
}

export default class PasswordStrengthChecker extends Component {
  static defaultProps = {
    minLevel: 0,
    minLength: 0,
    ruleNames: 'lowerCase|upperCase|digits|symbols',
    strengthLevels: [
      {
        label: 'Weak',
        labelColor: 'red',
        widthPercent: 0
      },
      {
        label: 'Weak',
        labelColor: 'red',
        widthPercent: 25
      },
      {
        label: 'Normal',
        labelColor: '#feb466',
        widthPercent: 50
      },
      {
        label: 'Strong',
        labelColor: 'green',
        widthPercent: 75
      },
      {
        label: 'Very Strong',
        labelColor: '#6cfeb5',
        widthPercent: 100
      }
    ],
    tooShort: {
      enabled: false,
      labelColor: '#fff',
      label: 'Too short',
      widthPercent: 33,
      innerBarColor: '#fe6c6c'
    },
    barWidthPercent: 70,
    showBarOnEmpty: true
  }

  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    minLength: PropTypes.number,
    ruleNames: PropTypes.string,
    strengthLevels: PropTypes.array,
    tooShort: PropTypes.object,
    minLevel: PropTypes.number,
    inputWrapperStyle: ViewPropTypes.style,
    inputStyle: TextInput.propTypes.style,
    strengthWrapperStyle: ViewPropTypes.style,
    strengthBarStyle: ViewPropTypes.style,
    innerStrengthBarStyle: ViewPropTypes.style,
    strengthDescriptionStyle: Text.propTypes.style,
    barWidthPercent: PropTypes.number,
    showBarOnEmpty: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    placeHolder: PropTypes.string
  }

  constructor (props) {
    super(props)
    this.animatedInnerBarWidth = new Animated.Value(0)
    this.animatedBarWidth = new Animated.Value(0)
    this.state = {
      level: -1,
      isTooShort: false,
      passwordText: ''
    }
  }

  componentDidMount () {
    const { showBarOnEmpty } = this.props
    if (showBarOnEmpty) {
      this.showFullBar()
    }
  }

  showFullBar (isShow = true) {
    const { barWidthPercent } = this.props
    const barWidth = isShow ? widthByPercent(barWidthPercent) : 0
    Animated.timing(this.animatedBarWidth, {
      toValue: barWidth,
      duration: 20
    }).start()
  }

  isTooShort (password) {
    const { minLength } = this.props
    if (!minLength) {
      return true
    }
    return password.length < minLength
  }

  isMatchingRules (password) {
    const { ruleNames } = this.props
    if (!ruleNames) {
      return true
    }

    const rules = _.chain(ruleNames)
      .split('|')
      .filter(rule => !!rule)
      .map(rule => rule.trim())
      .value()

    for (const rule of rules) {
      if (!this.isMatchingRule(password, rule)) {
        return false
      }
    }
    return true
  }

  isMatchingRule (password, rule) {
    switch (rule) {
      case 'symbols':
        return regex.symbolsPattern.test(password)
      case 'lowerCase':
        return regex.lowerCasePattern.test(password)
      case 'upperCase':
        return regex.upperCasePattern.test(password)
      case 'words':
        return regex.wordsPattern.test(password)
      case 'digits':
        return regex.digitsPattern.test(password)
      case 'letters':
        return regex.lettersPattern.test(password)

      default:
        return true
    }
  }

  calculateScore (text) {
    if (!text) {
      this.setState({
        isTooShort: false
      })
      return -1
    }

    if (this.isTooShort(text)) {
      this.setState({
        isTooShort: true
      })
      return 0
    }

    this.setState({
      isTooShort: false
    })

    if (!this.isMatchingRules(text)) {
      return 0
    }

    return zxcvbn(text).score
  }

  getPasswordStrengthLevel (password) {
    return this.calculateScore(password)
  }

  onChangeText (password) {
    const level = this.getPasswordStrengthLevel(password)
    this.setState({
      level: level,
      passwordText: password
    })
    const isValid =
      this.isMatchingRules(password) && level >= this.props.minLevel
    this.props.onChangeText(password, isValid)
  }

  onPressViewPassword = () => {
    const { onPressViewPassword } = this.props

    onPressViewPassword && onPressViewPassword()
  }

  renderPasswordInput () {
    const { secureTextEntry, placeHolder } = this.props
    const { passwordText } = this.state
    return (
      <View
        style={[
          styles.iconTextInputContainer,
          { marginTop: moderateScale(15) }
        ]}
      >
        <CustomTextInput
          style={{ flex: 1 }}
          textInputStyle={styles.iconTextInput}
          onChangeText={text => this.onChangeText(text)}
          multiline={false}
          placeholder={placeHolder}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ paddingLeft: 10 }}
          onPress={this.onPressViewPassword}
        >
          <MaterialCommunityIcons
            name='eye'
            size={18}
            color={!_.isEmpty(passwordText) ? 'black' : Color.disabledColor}
          />
        </TouchableOpacity>
      </View>
    )
  }

  renderPasswordStrength () {
    const {
      tooShort,
      barWidthPercent,
      strengthLevels,
      strengthWrapperStyle,
      strengthDescriptionStyle,
      showBarOnEmpty
    } = this.props

    const { level } = this.state

    const barWidth = widthByPercent(barWidthPercent)
    let strengthLevelLabelStyle = {}

    let strengthLevelLabel = ''
    let innerBarWidth = 0
    if (level !== -1) {
      if (!showBarOnEmpty) {
        this.showFullBar()
      }

      innerBarWidth = widthByPercent(
        strengthLevels[level].widthPercent,
        barWidth
      )

      strengthLevelLabelStyle = {
        color: strengthLevels[level].labelColor
      }
      strengthLevelLabel = strengthLevels[level].label

      if (tooShort.enabled && this.state.isTooShort) {
        innerBarWidth =
          widthByPercent(tooShort.widthPercent, barWidth) ||
          widthByPercent(strengthLevels[level].widthPercent, barWidth)
        strengthLevelLabelStyle = {
          color: tooShort.labelColor || strengthLevels[level].labelColor
        }
        strengthLevelLabel = tooShort.label || strengthLevels[level].label
      }
    } else {
      if (!showBarOnEmpty) {
        this.showFullBar(false)
      }
    }

    Animated.timing(this.animatedInnerBarWidth, {
      toValue: innerBarWidth,
      duration: 800
    }).start()

    return (
      <View style={[styles.passwordStrengthWrapper, strengthWrapperStyle]}>
        <CustomText
          size='small'
          style={[
            styles.strengthDescription,
            strengthDescriptionStyle,
            { ...strengthLevelLabelStyle }
          ]}
        >
          {strengthLevelLabel}
        </CustomText>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.wrapper}>
        {this.renderPasswordInput()}
        {this.renderPasswordStrength()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent'
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 0.8,
    borderColor: 'rgba(242, 242, 242, 0.5)'
  },
  input: {
    flex: 1,
    color: 'black',
    paddingTop: 7,
    paddingBottom: 10,
    fontSize: 20
  },
  passwordStrengthWrapper: {
    paddingLeft: 10,
    marginTop: 10,
    height: 14
  },
  innerPasswordStrengthBar: {
    borderRadius: 5,
    width: 0
  },
  strengthDescription: {
    color: '#fff'
  },
  iconTextInput: {
    borderWidth: 0,
    marginLeft: 10,
    padding: 0
  },
  iconTextInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Color.borderColor
  }
})
