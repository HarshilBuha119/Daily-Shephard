import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inContainer: {
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 8,
  },
  username: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: '#202126',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  div: {
    height: 2,
    backgroundColor: '#26252A',
  },
  divider: {
    height: 2,
    backgroundColor: '#2F2F37',
    paddingHorizontal: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 12,
    borderBottomColor: '#2F2F37',
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  img: {
    height: 35,
    width: 35,
  },
  menuItem: {
    backgroundColor: '#202126',
    borderRadius: 10,
    marginVertical: 5,
    overflow: 'hidden',
  },
  menuItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#202126',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  chevronIcon: {
    width: 30,
    height: 30,
  },
  footer: {
    alignSelf: 'center',
    paddingVertical: 30,
  },
  logo: {
    height: 100,
    width: 100,
  },
  listContainer: {
    backgroundColor: '#202126',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  green: {
    backgroundColor: '#20C997',
    padding: 5,
    height: 3,
    width: 30,
    borderRadius: 25,
    borderWidth: 1,
    transform: [{rotate: '90deg'}],
    position: 'absolute',
    top: 15,
    left: -15,
  },
});
