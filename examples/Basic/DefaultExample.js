import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-custom-actionsheet';

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 4;
const options = ['Cancel', 'Apple', 'Banana', 'Watermelon', 'Durian'];
const title = 'Which one do you like?';

class DefaultExample extends React.Component {
  state = {
    selected: '',
  };

  showActionSheet = () => this.actionSheet.show();

  getActionSheetRef = ref => (this.actionSheet = ref);

  handlePress = index => this.setState({ selected: index });

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={{ marginBottom: 20 }}>
          I like {options[this.state.selected]}
        </Text>
        <Text style={styles.button} onPress={this.showActionSheet}>
          Default ActionSheet
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

export default DefaultExample;
