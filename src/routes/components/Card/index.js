import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Card, ListItem, LinearGradient, YStack, XStack, Spinner, Separator, H2, Paragraph, H4, H5 } from 'tamagui';
import axios from 'axios';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import pavao from '../../../assets/PombaBranca_PNG.png';
import { useUser } from '../../../contexts/userContext';
import { colors } from '../../../utils/colors';

const fetchData = async (userId, token) => {
  try {
    const response = await axios.get(`https://server-gold-pi.vercel.app/posts`, {
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

const CardItem = ({ post }) => {
  return (
    <Animated.View  layout={Layout} entering={FadeIn} exiting={FadeOut}>
        <Card width={350} padding={20} backgroundColor='#cc3244'>
          <H4 color='white'>{post.title}</H4>
          <Paragraph color='white'>{post.content}</Paragraph>
          <Separator borderColor='white' alignSelf="stretch" marginVertical={15} />
          <XStack justifyContent='flex-start'>
          <Image source={pavao} style={{ width: 25, height: 25, marginRight: 8, alignSelf: 'center'}} resizeMode='contain'/>
          <Paragraph marginTop={4} color='white' alignSelf='center' fontSize={12}>{post.rating} / 5</Paragraph>
          </XStack>
        </Card>
    </Animated.View>
  );
};

const CardComponent = () => {
  const { userId, userData } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://server-gold-pi.vercel.app/posts/all`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao fazer a solicitação:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData(); 
    }, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  if (loading) {
    return <Spinner size="large" color={colors.unicap} />;
  }

  const SeparatorDiv = () => {
    return <View style={{ height: 20 }} />
  };
  

  return (
    <YStack alignItems='center' justifyContent='center'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardItem post={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}  
        ItemSeparatorComponent={() => <SeparatorDiv />} 
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
};

export default CardComponent;
