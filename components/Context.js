import {Text, Image, Pressable, View, StyleSheet} from 'react-native';
import {Images} from '../assets/Images';
export default function Context({title,description}) {
  return (
    <View style={styles.container}>
      <View style={styles.Scripture}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.name}>{description}</Text>
        </View>
        <Pressable>
            <Image style={styles.image} source={Images.Next} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#FAFAFA40',
        borderWidth: 0.5,
        borderRadius: 25,
        paddingHorizontal: 15,
        backgroundColor: '#202126',
        marginBottom:20
      },
      Scripture: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
      },
      text: {
        color: '#FFFFFF',
        fontSize: 12.87,
        fontFamily: 'Urbanist',
        fontWeight: '400',
      },
      name: {
        color: '#FFFFFF',
        fontSize: 14.48,
        fontFamily: 'Urbanist',
        fontWeight: '600',
        flex:1
      },
      title: {
        gap: 6,
        width:"90%",
      },
      button: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderColor: '#FAFAFA40',
        borderWidth: 1,
        padding: 5,
        borderRadius: 15,
        marginBottom:15
      },
      round: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FAFAFA40',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#202126',
      },
      image:{
        height:25,
        width:25
      }
});
