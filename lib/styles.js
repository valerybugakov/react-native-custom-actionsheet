import { StyleSheet } from 'react-native'

export const hairlineWidth = StyleSheet.hairlineWidth

export const baseStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.3,
    backgroundColor: '#000',
  },

  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleText: {
    color: '#8f8f8f',
    fontSize: 12,
  },
  message: {
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  optionsContainer: {
    borderRadius: 12,
  },
  options: {
    backgroundColor: '#cecece',
  },
  btnWrapper: {
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  btnTitle: {
    fontSize: 20,
  },

  cancelButton: {
    borderRadius: 12,
  },
  cancelTitle: {
    fontWeight: '600',
  },
})

export const androidStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5',
  },

  optionsContainer: {},
  btnWrapper: {
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  cancelButton: {},
})
