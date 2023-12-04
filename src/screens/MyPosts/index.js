import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Card, Spinner, YStack, Separator, XStack, Paragraph, H5, CardBackground, H4 } from 'tamagui';
import axios from 'axios';
import pavao from '../../assets/PombaBranca_PNG.png';
import { useUser } from '../../contexts/userContext';
import { colors } from '../../utils/colors';
import { Feather } from '@expo/vector-icons';

const MyPosts = () => {
  const { userId, userData } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedPost, setEditedPost] = useState({});

  const openModal = (post) => {
    setEditedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const saveChanges = async () => {
    try {
      const ratingValue = parseFloat(editedPost.rating);
      if (!isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5) {
        const updatedData = {
          title: editedPost.title,
          content: editedPost.content,
          rating: ratingValue,
        };

        await editPost(editedPost.id, updatedData);
      } else {
        console.error('Rating inválido. Insira um número entre 1 e 5.');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }

    closeModal();
  };


  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`https://server-gold-pi.vercel.app/posts?userId=${userId}`, {
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

  const deletePost = async (postId) => {
    try {
      await axios.delete(`https://server-gold-pi.vercel.app/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      fetchUserPosts();
    } catch (error) {
      console.error('Erro ao excluir o post:', error);
    }
  };

  const editPost = async (postId, updatedData) => {
    try {
      await axios.put(`https://server-gold-pi.vercel.app/posts/${postId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      fetchUserPosts();
    } catch (error) {
      console.error('Erro ao editar o post:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();

    const intervalId = setInterval(() => {
      fetchUserPosts();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <Spinner size="large" color={colors.unicap} />;
  }

  const CardItem = ({ post }) => {
    return (
      <Card width={350} backgroundColor='#cc3244' padding={20}>
        <H4 color='white'>{post.title}</H4>
        <Paragraph color='white'>{post.content}</Paragraph>
        <Separator borderColor='white' alignSelf="stretch" marginVertical={15} />
        <XStack justifyContent='flex-start'>
          <Image source={pavao} style={{ width: 25, height: 25, marginRight: 8, alignSelf: 'center' }} resizeMode='contain' />
          <Paragraph marginTop={4} color='white' alignSelf='center' fontSize={12}>{post.rating} / 5</Paragraph>
        </XStack>
        <XStack justifyContent='space-between' marginTop={10}>
          <TouchableOpacity onPress={() => openModal(post)}>
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletePost(post.id)}>
            <Feather name="trash-2" size={24} color="white" />
          </TouchableOpacity>
        </XStack>
      </Card>
    );
  };

  const SeparatorDiv = () => {
    return <View style={{ height: 20 }} />
  };

  return (
    <YStack fullscreen alignItems='center' justifyContent='center' flex={1} padding={20}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CardItem post={item} />}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <SeparatorDiv />} 
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }}>
            <YStack flex={1} alignSelf='center' backgroundColor={'transparent'}>
              <Card width={350} padding={20} backgroundColor='#cc3244' >
                <TextInput
                  placeholder="Title"
                  value={editedPost.title}
                  onChangeText={(text) => setEditedPost({ ...editedPost, title: text })}
                />
                <TextInput
                  placeholder="Content"
                  value={editedPost.content}
                  onChangeText={(text) => setEditedPost({ ...editedPost, content: text })}
                />
                <TextInput
                  placeholder="Rating"
                  value={editedPost.rating ? editedPost.rating.toString() : ''}
                  onChangeText={(text) => setEditedPost({ ...editedPost, rating: text })}
                />
                <TouchableOpacity onPress={saveChanges}>
                  <Text>Save Changes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </Card>
            </YStack>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </YStack>
  );
};

export default MyPosts;
