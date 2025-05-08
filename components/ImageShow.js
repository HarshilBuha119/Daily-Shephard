import { Text, Image, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function ImageShow({ image, title, description, publisher, topics }) {
  
  const navigation=useNavigation();
  const handleDetails = () => {
    navigation.navigate('Detail', {
      image,
      title,
      description,
      publisher,
      topics,
    });
  };

  return (
    <Pressable style={styles.container}>
      <Pressable onPress={handleDetails}>
        <Image style={styles.image} source={image} />
      </Pressable>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.description} numberOfLines={2} >
        {description}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex:0.5,
  },
  image: {
    height: 170,
    width: "95%",
    borderRadius: 10,
  },
  title: {
    color: '#20C997',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
  },
  description: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
    flexShrink:1,
    flexWrap:"wrap"
  },
});