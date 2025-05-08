import React from 'react';
import {View, Image, TextInput, ScrollView, StyleSheet} from 'react-native';
import Comments from '../components/Comments';
import {Images} from '../assets/Images';
function CommentsScreen() {
  return (
    <>
      <ScrollView style={styles.conatainer}>
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
      </ScrollView>
      <View style={styles.mainInputContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add your comment..."
            placeholderTextColor="#FAFAFA80"
            style={styles.input}
          />
          <View style={styles.imageContainer}>
          <Image
            source={Images.Continue}
            resizeMode="contain"
            style={styles.searchImage}
          />
          </View>
        </View>
      </View>
    </>
  );
}

export default CommentsScreen;

const styles = StyleSheet.create({
  conatainer: {
    backgroundColor: '#18171C',
  },
  mainInputContainer:{
    backgroundColor:"#18171C",
    position: 'absolute',
    bottom: 0,
    width:"100%",
    paddingVertical:20,
    borderTopColor:"#26252A",
    borderTopWidth:1,
    paddingBottom:30
  },
  inputContainer: {
    flexDirection: 'row',
    width: '90%',
    borderWidth: 1,
    borderColor: '#38393E',
    borderRadius: 35,
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'space-between',
    
  },
  imageContainer:{
    height: 40,
    width: 40,
    backgroundColor:"#20C997",
    borderRadius:50,
    justifyContent:'center'
 },
  searchImage: {
    height: 20,
    width: 35,
    alignSelf:"center",
  },
  input: {
    color: '#FAFAFA',
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  
});
