import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text, Platform, View, Dimensions,
  Modal, TouchableHighlight, Animated, ScrollView,
} from 'react-native'

import { baseStyles, androidStyles, hairlineWidth } from './styles'

const defaultStyles = Platform.select({
  ios: baseStyles,
  android: Object.assign({}, baseStyles, androidStyles),
})

const MAX_HEIGHT = Dimensions.get('window').height * 0.7

class ActionSheet extends Component {
  constructor(props) {
    super(props)

    this.scrollEnabled = false
    this.translateY = this.calculateHeight(props)

    this.state = {
      visible: false,
      sheetPositionY: new Animated.Value(this.translateY),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.translateY = this.calculateHeight(nextProps)
  }

  show() {
    this.setState({ visible: true })
    this.showSheet()
  }

  hide(index) {
    this.hideSheet(() => {
      this.setState({ visible: false })
      this.props.onPress(index)
    })
  }

  cancel = () => {
    const { cancelButtonIndex } = this.props

    if (cancelButtonIndex > -1) {
      this.hide(cancelButtonIndex)
    }
  }

  showSheet() {
    Animated.timing(this.state.sheetPositionY, {
      toValue: 0,
      duration: 250,
    }).start()
  }

  hideSheet(callback) {
    Animated.timing(this.state.sheetPositionY, {
      toValue: this.translateY,
      duration: 150,
    }).start(callback)
  }

  calculateHeight(props) {
    const {
      options,
      buttonHeight,
      titleHeight,
      messageHeight,
      cancelMargin,
    } = props

    let height = options.reduce(
      (sum, { height: optionHeight = buttonHeight }) => sum += optionHeight,
      cancelMargin
    )

    if (props.title) height += titleHeight
    if (props.message) height += messageHeight

    if (height > MAX_HEIGHT) {
      this.scrollEnabled = true
      return MAX_HEIGHT
    } else {
      this.scrollEnabled = false
      return height
    }
  }

  renderTitle() {
    const { title, titleHeight, styles } = this.props

    if (!title) {
      return null
    }

    const style = [styles.title, { height: titleHeight }]

    if (React.isValidElement(title)) {
      return (
        <View style={style}>{title}</View>
      )
    }

    return (
      <View style={style}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    )
  }

  renderMessage() {
    const { message, messageHeight, styles } = this.props

    if (!message) {
      return null
    }

    const style = [styles.title, { height: messageHeight }]

    if (React.isValidElement(message)) {
      return (
        <View style={style}>{message}</View>
      )
    }

    return (
      <View style={style}>
        <Text style={styles.titleText}>{message}</Text>
      </View>
    )
  }

  renderCancelButton() {
    const {
      options,
      cancelButtonIndex,
      tintColor,
      cancelMargin,
      styles,
      buttonHeight,
      buttonUnderlayColor,
    } = this.props

    if (cancelButtonIndex === -1 || !options[cancelButtonIndex]) {
      return null
    }

    return (
      <TouchableHighlight
        activeOpacity={1}
        underlayColor={buttonUnderlayColor}
        style={[
          styles.btnWrapper,
          styles.cancelButton,
          {
            marginTop: cancelMargin,
            height: buttonHeight,
          },
        ]}
        onPress={this.cancel}
      >
        <Text
          style={[styles.btnTitle, styles.cancelTitle, { color: tintColor }]}
        >
          {options[cancelButtonIndex]}
        </Text>
      </TouchableHighlight>
    )
  }

  renderButton(option, fontColor, index, style) {
    const { styles, buttonHeight, buttonUnderlayColor } = this.props
    const height = option.component ? option.height : buttonHeight

    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor={buttonUnderlayColor}
        style={[styles.btnWrapper, style, { height }]}
        onPress={() => this.hide(index)}
      >
        {
          option.component
            ? option.component
            : (
              <Text style={[styles.btnTitle, {color: fontColor}]}>
                {option}
              </Text>
            )
        }
      </TouchableHighlight>
    )
  }

  renderOptions() {
    const {
      options,
      tintColor,
      warnColor,
      cancelButtonIndex,
      destructiveButtonIndex,
    } = this.props

    return options.map((title, index) => {
      const fontColor = destructiveButtonIndex === index ? warnColor : tintColor

      return index === cancelButtonIndex ? null : this.renderButton(title, fontColor, index)
    })
  }

  render() {
    const { styles } = this.props
    const { visible, sheetPositionY } = this.state

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={this.cancel}
      >
        <View style={styles.wrapper}>
          <Text style={styles.overlay} onPress={this.cancel} />
          <Animated.View
            style={[
              styles.backdrop,
              {
                height: this.translateY,
                transform: [{translateY: sheetPositionY}],
              },
            ]}
          >
            {this.renderTitle()}
            {this.renderMessage()}

            <ScrollView
              style={styles.optionsContainer}
              scrollEnabled={this.scrollEnabled}
              contentContainerStyle={styles.options}
            >
              {this.renderOptions()}
            </ScrollView>

            {this.renderCancelButton()}
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

ActionSheet.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  message: PropTypes.string,
  options: PropTypes.arrayOf((propVal, key, componentName, location, propFullName) => {
    if (typeof propVal[key] !== 'string' && !React.isValidElement(propVal[key].component)) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      )
    }
  }),

  tintColor: PropTypes.string,
  cancelButtonIndex: PropTypes.number,
  destructiveButtonIndex: PropTypes.number,
  onPress: PropTypes.func,
}

ActionSheet.defaultProps = {
  buttonUnderlayColor: '#ebebeb',
  warnColor: '#ff3b30',
  tintColor: '#007aff',

  titleHeight: 40,
  messageHeight: 40,
  buttonHeight: 58 + hairlineWidth,
  cancelMargin: Platform.select({
    ios: 10,
    android: 6,
  }),

  styles: defaultStyles,
  onPress: () => {},
}

export default ActionSheet
