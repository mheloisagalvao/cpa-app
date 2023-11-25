import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
    console.log(`Rating selecionado: ${selectedRating}`);
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((item) => (
        <TouchableOpacity
          key={item}
          onPress={() => handleRating(item)}
          style={styles.ratingItem}
        >
          <Image
            source={item <= rating ? require('../../../assets/5_Estrelas.png') : require('../../../assets/0_Estrelas.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  ratingItem: {
    margin: 5,
  },
  image: {
    width: 35, 
    height: 35, 
  },
});

export default Rating;
