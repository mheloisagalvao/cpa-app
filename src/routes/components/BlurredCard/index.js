import React from 'react';
import { useQuery } from 'react-query';
import { useWindowDimensions, View, Animated, Text } from 'react-native';
import { FadeIn, Layout, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { BlurredItem } from '../BlurredCard/BlurredItem';
import { useUser } from '../../../contexts/userContext';
import axios from 'axios';

const fetchData = async (userId, token) => {
  try {
    const response = await axios.get(`https://server-gold-pi.vercel.app/posts?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error);
    throw error; 
  }
};

const BlurredCard = () => {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const contentOffsetY = useSharedValue(0);
  const { userId, userData } = useUser();

  const blurredItemContainerHeight = windowHeight * 0.45;


  console.log('userData:', userData);

  const { data, error, isLoading } = useQuery(['posts', userId], () => fetchData(userId, userData.token));

  if (isLoading) {
    return null;
  }

  if (error) {
    return (
      <View>
        <Text>Erro ao carregar dados</Text>
      </View>
    );
  }

  return (
    <View>
      <Animated.FlatList
        layout={Layout}
        entering={FadeIn}
        
        scrollEventThrottle={16}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BlurredItem
            width={windowWidth}
            height={300}
            index={index}
            contentOffsetY={contentOffsetY}
            post={item} 
          />
        )}
        getItemLayout={(_, index) => {
          return {
            length: windowHeight,
            offset: blurredItemContainerHeight * index,
            index,
          };
        }}
      />
    </View>
  );
};

export { BlurredCard };
