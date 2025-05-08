import { View, Image, StyleSheet, TextInput } from 'react-native';
import { Images } from '../assets/Images';
import Verse from '../components/Verse';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const date = moment().format('ll');
  const navigation = useNavigation();

  const verses = [
    { id: 2, title: date, verseText: "But thanks be to God! He gives us the victory through our Lord." },
    { id: 3, title: date, verseText: "Be joyful in hope, patient in affliction, and faithful in prayer." },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.inputContainer}>
        <Image source={Images.Search} resizeMode="contain" style={styles.searchImage} />
        <TextInput
          placeholder="Search by topic, scripture, or keyword…"
          placeholderTextColor="#FAFAFA80"
          style={styles.input}
        />
      </View>

      {verses.map(verse => (
        <Verse
          key={verse.id}
          id={verse.id}
          title={verse.title}
          verseText={verse.verseText}
          onPress={() => navigation.navigate('HistoryComment', { verse })}
        />
      ))}
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
    marginBottom: 20,
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
