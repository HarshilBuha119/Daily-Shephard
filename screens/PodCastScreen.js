import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import { Images } from '../assets/Images';
import ImageShow from '../components/ImageShow';
import { useState } from 'react';
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function PodCastScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const podcasts = [
    {
      image: Images.Image,
      title: 'Ascension Catholic Media',
      description: 'The Bible in a Year (with Fr. Mike Schmitz)',
      publisher: 'Ascension Catholic Media',
      topics: [
        'Daily Bible Readings',
        'Catholic Teachings',
        'Spiritual Growth',
        'Understanding Scripture',
      ],
    },
    {
      image: Images.Image1,
      title: 'LifeAudio',
      description: 'How to Study the Bible - Bible Study Made Simple',
      publisher: 'LifeAudio',
      topics: [
        'Bible Study Tips',
        'Understanding Scripture',
        'Spiritual Growth',
        'Practical Faith',
      ],
    },
    {
      image: Images.Image2,
      title: 'Dr. Melody Stevens',
      description: 'The Bible in a Year Podcast with Dr. Melody',
      publisher: 'Dr. Melody Stevens',
      topics: [
        'Daily Bible Readings',
        'Spiritual Insights',
        'Christian Living',
        'Faithful Study',
      ],
    },
    {
      image: Images.Image3,
      title: 'LifeAudio',
      description: 'Faith Over Fear',
      publisher: 'LifeAudio',
      topics: [
        'How to Overcome Fear',
        'Biblical Strategies for Overcoming Fear and Anxiety',
        'Powerful Steps to Fight Anxiety',
        'Finding God Faithful in Hard Seasons',
        'Courage to Wait on God',
      ],
    },
    {
      image: Images.Image4,
      title: 'Radically Christian',
      description: 'Daily Bible',
      publisher: 'Radically Christian',
      topics: [
        'Daily Devotions',
        'Christian Living',
        'Scripture Reflections',
        'Spiritual Growth',
      ],
    },
  ];

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <ImageShow
      image={item.image}
      title={item.title}
      description={item.description}
      publisher={item.publisher}
      topics={item.topics}
    />
  );

  return (
    <View style={[styles.container, {paddingBottom:insets.bottom }]}>
      <View style={styles.inputContainer}>
        <Image
          source={Images.Search}
          resizeMode="contain"
          style={styles.searchImage}
        />
        <TextInput
          placeholder="Search podcasts..."
          placeholderTextColor="#FAFAFA80"
          style={styles.input}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList 
        data={filteredPodcasts}
        renderItem={renderItem}
        keyExtractor={(value,index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#38393E',
    borderRadius: 35,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom:30
  },
  searchImage: {
    height: 35,
    width: 35,
  },
  input: {
    color: '#FAFAFA',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
});