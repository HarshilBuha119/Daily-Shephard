import {View, Text} from 'react-native';
import { styles } from '../components/Styles';

function MenuBox ({title, children}){
  return (
    <View style={styles.menuItem}>
      <View style={styles.green} />
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.inContainer}>
        {children}
      </View>
    </View>
  );
};

export default MenuBox;
