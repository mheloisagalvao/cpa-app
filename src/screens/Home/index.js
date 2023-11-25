import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, XStack, YStack, Text, H4 } from "tamagui";
import { BlurredCard } from "../../routes/components/BlurredCard";
import Settings from "../Settings";
import axios from "axios";
import { useUser } from "../../contexts/userContext";
import { Title, Container } from "./styles";

const Home = () => {
  const { userId } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://server-gold-pi.vercel.app/users/${userId}`);

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <Container>
      <XStack space="$2" ai="center">
        {userData ? (
          <Avatar size="$5" circular>
            <Avatar.Image src={userData.avatarUrl} />
            <Avatar.Fallback backgroundColor="$gray5" />
          </Avatar>
        ) : null}
        <YStack>
          <Text color="$gray10">Olá,</Text>
          {userData ? (
            <H4 fontWeight="bold" mt="$-2">
              {userData.name}
            </H4>
          ) : null}
        </YStack>
      </XStack>
      <BlurredCard />
      <View style={{ width: "100%", position: "absolute" }}>
        <Settings />
      </View>
    </Container>
  );
};

export default Home;
