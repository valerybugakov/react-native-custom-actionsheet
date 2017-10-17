import { Platform } from 'react-native'
import ActionSheetIOS from './ActionSheetIOS'
import ActionSheetCustomInternal from './ActionSheetCustom'

export const ActionSheetCustom = ActionSheetCustomInternal

let ActionSheet

if (Platform.OS === 'ios') {
  ActionSheet = ActionSheetIOS
} else {
  ActionSheet = ActionSheetCustomInternal
}

export default ActionSheet
