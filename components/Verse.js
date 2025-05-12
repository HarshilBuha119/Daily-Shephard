import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Images } from "../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite, selectFavourites } from "../redux/slices/favSlice";
import Share from 'react-native-share';
export default function Verse({ id, title, verseText, onPress ,username}) {
  const favourites = useSelector(selectFavourites) || [];
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleShare = async () => {
    try {
      const shareOptions = {
        title: 'Share Verse',
        message: `${verseText}\n\n— ${title}`,
      };
      await Share.open(shareOptions);
    } catch (error) {
      if (error && error.message !== 'User did not share') {
        console.log('Share error:', error);
      }
    }
  };

  const isFavourite = favourites.some(item => item.id === id);

  const handleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(id));
    } else {
      dispatch(addFavourite({ id, title, verseText}));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={()=>{
      if(onPress){
        onPress()
      }
    }}>
      <View style={styles.Scripture}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.name}>{username}</Text>
        </View>
        <Pressable style={styles.button}>
          <Image style={{ height: 15, width: 15 }} source={Images.Speaker} resizeMode="contain" />
          <Text style={styles.text}>Listen</Text>
        </Pressable>
      </View>
      <Text style={styles.verse}>
        {verseText}
      </Text>
      <View style={styles.reactions}>
        <View style={[styles.button, { borderWidth: 0 }]}>
          <Pressable onPress={handleFavourite} style={styles.round}>
            <Image style={styles.icon} source={isFavourite ? Images.Favourite1 : Images.Favourite2} />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Comments')} style={styles.commentButton}>
            <Image style={styles.icon} source={Images.Comment} />
            <Text style={styles.commentText}>82</Text>
          </Pressable>
        </View>
        <Pressable onPress={handleShare} style={styles.round}>
          <Image style={styles.icon} source={Images.Share} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#FAFAFA40',
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#202126',
    marginBottom: 20,
  },
  Scripture: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: "Urbanist-Italic",
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14.48,
    fontFamily: "Urbanist-ExtraBoldItalic",
  },
  title: {
    gap: 6,
  },
  button: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderColor: '#FAFAFA40',
    borderWidth: 1,
    padding: 5,
    borderRadius: 15,
  },
  verse: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'Hedvig',
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 25,
  },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAFAFA40',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202126',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FAFAFA40',
  },
  icon: {
    width: 22,
    height: 20,
  },
  commentText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Urbanist',
    fontWeight: '500',
  },
});
