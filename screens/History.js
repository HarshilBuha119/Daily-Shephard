import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Images} from '../assets/Images';
import Verse from '../components/Verse';
import Context from '../components/Context';
export default function History({route}) {
  const {verse} = route.params;
  return (
    <>
      <View style={styles.divider} />
      <ScrollView style={styles.container}>
        <Verse id={verse.id} title={verse.title} verseText={verse.verseText} />
        <Context
          title={"Today's Reflection"}
          description={
            "God's plan for us is filled with hope. Reflect on the assurance that His pro..."
          }
        />
        <Context
          title={'Context Chapter'}
          description={'What does John 1:1 KJV mean?'}
        />
        <View style={styles.innerContainer}>
          <View style={styles.video}>
            <Text style={styles.text}>Watch Video</Text>
            <View style={styles.radius}>
              <Image style={styles.book} source={Images.Book} />
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  innerContainer: {
    borderColor: '#FAFAFA40',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#202126',
    marginBottom: 20,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12.87,
    fontFamily: 'Urbanist',
    fontWeight: '400',
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
  divider: {
    height: 1,
    backgroundColor: '#26252A',
  },
});
