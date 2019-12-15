import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class Message extends PureComponent {
  render() {
    const { text, style, titleStyle } = this.props;

    if (React.isValidElement(text)) {
      return <View style={style}>{text}</View>;
    }

    return (
      <View style={style}>
        <Text style={titleStyle}>{text}</Text>
      </View>
    );
  }
}

export default Message;
