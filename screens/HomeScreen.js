import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import Verse from '../components/Verse';
import {Images} from '../assets/Images';
import moment from 'moment';
import Context from '../components/Context';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const date = moment().format('ll');
  const profile = useSelector(state => state.profile);
  const name = profile.name;
  const navigation=useNavigation();
  const verses = [
    {
      id: 1,
      username:"John 1:1 KJV",
      title: "Verse of the day",
      verseText:
        'In the beginning was the word, and the word was with God, and the word was God.',
    }
  ];
  const handleNavigation=()=>{
    
  }
  return (
    <ScrollView
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <Image
            style={{height: 50, width: 50}}
            source={Images.Morning}
            resizeMode="contain"
          />
          <View>
            <Text style={{color: 'white', fontSize: 16}}>Good Morning,</Text>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              {name ? name : "Unknown"}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.shadow}>
            <Text></Text>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      {verses?.map(
              verse =>
                verse && (
                  <Verse
                    key={1}
                    id={1}
                    username={verse.username}
                    title={verse.title}
                    verseText={verse.verseText}
                    onPress={() => {
                      navigation.navigate('HistoryComment', {verse});
                      console.log(verse.username);
                      
                    }}
                  />
                ),
            )}
      <Context title={"Today's Reflection"} description={"God's plan for us is filled with hope. Reflect on the assurance that His pro..."}/>
      <Context title={"Context Chapter"} description={"What does John 1:1 KJV mean?"}/>
      <View style={styles.innerContainer}>
        <View style={styles.video}>
          <Text style={styles.text}>Watch Video</Text>
          <View style={styles.radius}>
            <Image style={styles.book} source={Images.Book} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingHorizontal: 20,
    gap: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
  },
  date: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  shadow: {
    position: 'absolute',
    backgroundColor: '#20C997',
    opacity: 0.4,
    bottom: -1,
    width: 112,
    height: 12,
  },
  video: {
    marginVertical: 15,
  },
  book: {
    height: 200,
    width: '100%',
    borderRadius: 15,
  },
  radius: {
    height: 200,
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 0,
    marginVertical: 20,
  },
  innerContainer: {
    borderColor: '#FAFAFA40',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#202126',
    marginBottom: 50,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12.87,
    fontFamily: 'Urbanist',
    fontWeight: '400',
  },
});
