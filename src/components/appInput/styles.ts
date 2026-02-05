import {StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useDeviceDimensions} from '../../hooks/useDeviceDimensions';

const useStyles = () => {
  const {colors} = useTheme();
  const {moderateWidth, moderateHeight} = useDeviceDimensions();

  return StyleSheet.create({
    wrapper: {
      marginTop: moderateHeight(1.8),
    },
    title: {
      fontSize: moderateWidth(3.5),
    },
    subTitleStyle: {
      fontSize: moderateWidth(3.5),
      marginLeft: moderateWidth(1),
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: moderateWidth(0.4),
      borderRadius: moderateWidth(2.5),
      paddingHorizontal: moderateWidth(3),
    },
    textInput: {
      flex: 1,
      fontSize: moderateHeight(2),
      height: moderateHeight(5.5),
    },
    prefix: {
      height: moderateHeight(5.5),
      fontSize: moderateHeight(2),
      paddingTop: moderateHeight(1),
    },

    errorText: {
      textAlign: 'right',
      color: 'red',
      fontSize: moderateHeight(1.6),
      marginTop: moderateHeight(0.5),
      marginRight: moderateHeight(0.5),
    },
    eyeView: {
      marginTop: moderateWidth(0.5),
    },
  });
};

export default useStyles;
