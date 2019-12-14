import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionSheetCustom as ActionSheet } from 'react-native-custom-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = [
  'Cancel',
  'Apple',
  {
    component: <Text style={{ color: 'orange', fontSize: 24 }}>Banana</Text>,
    height: 80,
  },
  'Watermelon',
  {
    component: <Text style={{ color: 'blueviolet' }}>Apple</Text>,
    height: 40,
  },
];

const title = (
  <Text style={{ color: 'crimson', fontSize: 18 }}>Which one do you like?</Text>
);

class CustomExample extends Component {
  state = {
    selected: 1,
  };

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = ref => (this.actionSheet = ref);

  handlePress = index => this.setState({ selected: index });

  render() {
    const { selected } = this.state;
    const selectedText = options[selected].component || options[selected];

    return (
      <View style={styles.wrapper}>
        <Text style={{ marginBottom: 20 }}>I like {selectedText}</Text>
        <Text style={styles.button} onPress={this.showActionSheet}>
          Custom ActionSheet
        </Text>
        <ActionSheet
          ref={this.getActionSheetRef}
          title={title}
          message="custom message custom message custom message custom message custom message custom message "
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          destructiveButtonIndex={DESTRUCTIVE_INDEX}
          onPress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#38f',
  },
});

export default CustomExample;
