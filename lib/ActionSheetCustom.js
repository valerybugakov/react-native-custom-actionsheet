import React, { Component } from 'react'
import { oneOfType, func, object, string, number, element, arrayOf } from 'prop-types'
import {
  Text, Platform, View, Dimensions,
  Modal, Animated, ScrollView,
} from 'react-native'

import Message from './Message'
import Button from './Button'
import CancelButton from './CancelButton'

import { baseStyles, androidStyles, hairlineWidth } from './styles'

const defaultStyles = Platform.select({
  ios: baseStyles,
  android: Object.assign({}, baseStyles, androidStyles),
})

const MAX_HEIGHT = Dimensions.get('window').height * 0.7

const pick = (source, props) => props.reduce((res, key) => {
  res[key] = source[key]
  return res
}, {})

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

  hide = index => {
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

  renderOptions(styles) {
    const {
      options,
      tintColor,
      warnColor,
      cancelButtonIndex,
      destructiveButtonIndex,
      buttonHeight,
      buttonUnderlayColor,
    } = this.props

    return options.map((option, index) => {
      const fontColor = destructiveButtonIndex === index ? warnColor : tintColor

      return index === cancelButtonIndex
        ? null
        : <Button
          key={`button_${index}`}
          {...{
            option,
            styles,
            index,
            fontColor,
            buttonHeight,
            buttonUnderlayColor,
            onPress: this.hide,
          }}
        />
    })
  }

  render() {
    const {
      styles: userStyles,
      message,
      messageHeight,
      title,
      titleHeight,
    } = this.props

    const { visible, sheetPositionY } = this.state
    const styles = Object.assign({}, userStyles, defaultStyles)

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
            {title &&
              <Message
                text={title}
                titleStyle={styles.titleText}
                style={[styles.title, { height: titleHeight }]}
              />}

            {message &&
              <Message
                text={message}
                titleStyle={styles.messageText}
                style={[
                  styles.message,
                  { height: messageHeight },
                  title && {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                ]}
              />}

            <ScrollView
              scrollEnabled={this.scrollEnabled}
              style={[
                styles.optionsContainer,
                (title || message) && {
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                },
              ]}
              contentContainerStyle={styles.options}
            >
              {this.renderOptions(styles)}
            </ScrollView>

            <CancelButton
              styles={styles}
              onPress={this.cancel}

              {...pick(this.props, [
                'options',
                'cancelButtonIndex',
                'tintColor',
                'cancelMargin',
                'buttonHeight',
                'buttonUnderlayColor',
              ])}
            />
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

ActionSheet.propTypes = {
  message: string,
  title: oneOfType([ string, element ]),
  options: arrayOf((propVal, key, componentName, location, propFullName) => {
    if (
      typeof propVal[key] !== 'string' &&
      !React.isValidElement(propVal[key].component)
    ) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      )
    }
  }),

  cancelButtonIndex: number,
  destructiveButtonIndex: number,

  tintColor: string,
  warnColor: string,
  buttonUnderlayColor: string,

  titleHeight: number,
  messageHeight: number,
  buttonHeight: number,
  cancelMargin: number,

  styles: object,
  onPress: func,
}

ActionSheet.defaultProps = {
  tintColor: '#007aff',
  warnColor: '#ff3b30',
  buttonUnderlayColor: '#ebebeb',

  titleHeight: 40,
  messageHeight: 50,
  buttonHeight: 58 + hairlineWidth,
  cancelMargin: Platform.select({
    ios: 10,
    android: 6,
  }),

  styles: defaultStyles,
  onPress: () => {},
}

export default ActionSheet
