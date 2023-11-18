import { Text, TouchableOpacity, StyleSheet } from 'react-native';


const DrawerListItem = ({ label, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 2,
  },
  label: {
    color: 'white',
    marginLeft: 15,
    fontWeight: '500',
    letterSpacing: 1,
  },
});

export { DrawerListItem };
