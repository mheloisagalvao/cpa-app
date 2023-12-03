import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Avatar, XStack, YStack, Text, H4 } from "tamagui";
import { BlurredCard } from "../../routes/components/BlurredCard";
import Settings from "../Settings";
import axios from "axios";
import { useUser } from "../../contexts/userContext";
import { Title, Container } from "./styles";
import CardComponent, { CardItem } from "../../routes/components/Card";
import { colors } from "../../utils/colors";

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
    <YStack fullscreen justifyContent="center" alignItems="center" backgroundColor="white">
      <XStack width="100%" height={200} paddingTop="30%" paddingLeft={15} paddingBottom={15} space="$2"> 
        {userData ? (
          <Avatar size="$5" circular>
            <Avatar.Image src={{ uri: userData.avatarUrl }} />
            <Avatar.Fallback backgroundColor="$gray5" />
          </Avatar>
        ) : null}
        <YStack>
          <Text fontStyle="italic" fontSize={18} color={colors.coolGray}>Olá,</Text>
          {userData ? (
            <H4 color={colors.unicap} fontWeight="bold" mt="$-2">
              {userData.name}!
            </H4>
          ) : null}
        </YStack>
      </XStack>
      <CardComponent  />
      <View style={{ width: "100%", position: "absolute" }}>
        <Settings />
        </View>
    </YStack>
  );
};

export default Home;