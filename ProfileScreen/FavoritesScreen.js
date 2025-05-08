import React from 'react';
import { StyleSheet, ScrollView, View,Text } from 'react-native';
import Verse from '../components/Verse';
import { useSelector } from 'react-redux';
import { selectFavourites } from '../redux/slices/favSlice';
import { useNavigation } from '@react-navigation/native';

function FavoritesScreen() {
  const favourites = useSelector(selectFavourites) || [];
  const navigation=useNavigation()
  return (
    <>
      <View style={styles.divider}></View>
      <View style={styles.space}></View>
      <ScrollView style={styles.container}>
        {favourites.length > 0 ? (
                  favourites.map((verse) => (
                    <Verse
                      key={verse.id}
                      id={verse.id}
                      title={verse.title}
                      verseText={verse.verseText}
                      onPress={() => navigation.navigate('HistoryComment', { verse })}
                    />
                  ))
                ) : (
                  <Text style={styles.emptyText}>No favourites yet.</Text>
                )}
      </ScrollView>
    </>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingHorizontal: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#26252A',
  },
  space: {
    backgroundColor: '#18171C',
    padding: 10,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 50,
    fontSize: 25,}
});
