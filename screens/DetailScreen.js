import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../assets/Images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
export default function DetailScreen({route}) {
  const {image, title, description, publisher, topics} = route.params;
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const Back = () => {
    navigation.goBack();
  };
  return (
    <ScrollView style={[styles.container, {paddingTop: inset.top}]}>
      <Pressable onPress={Back}>
        <Image
          source={Images.ArrowLeft}
          style={styles.imageLeft}
          resizeMode="contain"
        />
      </Pressable>
      <Image source={image} style={styles.image} resizeMode="contain" />

      {/* Publisher */}
      <Text style={styles.publisher}>{publisher}</Text>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Play Button */}
      <Pressable style={styles.playButton}>
        <Image
          style={styles.playButtonImg}
          source={Images.Play}
          resizeMode="contain"
        />
        <Text style={styles.playButtonText}>Play</Text>
      </Pressable>

      {/* Description Section */}
      <View style={{alignSelf: 'flex-start',marginVertical:10}}>
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.divider}></View>
      </View>
      <Text style={styles.description}>{description}</Text>

      {/* Topics Section */}
      <Text style={[styles.description,{color:"white"}]}>This podcast covers topics like:</Text>
      {topics.map((topic, index) => (
        <View key={index} style={styles.topicItem}>
          <Text style={styles.bullet}>⭐</Text>
          <Text style={styles.topicText}>{topic}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  imageLeft: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: 20,
  },
  publisher: {
    color: '#20C997',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  playButton: {
    backgroundColor: '#20C997',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
    marginVertical: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  playButtonImg: {
    height: 25,
    width: 25,
  },
  playButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#20C997',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 20,
    marginBottom:10
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  bullet: {
    marginRight: 10,
  },
  topicText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#20C997',
  },
});
