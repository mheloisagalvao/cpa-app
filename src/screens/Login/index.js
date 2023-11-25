import React, { useState } from 'react'
import { Container, Description, Title } from "./styles"
import { Button, Input, Label, Switch, XStack, YStack } from 'tamagui'
import { Image } from 'react-native'
import pombabranca from '../../assets/PombaBranca_PNG.png'
import { colors } from '../../utils/colors'
import axios from 'axios'
import { useUser } from '../../contexts/userContext'

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLoggedInUserId } = useUser();

const toRegister = async () => {
  navigation.navigate('SignIn')
}

  const authLogin = async () => {
    try {
      const response = await axios.post('http://server-gold-pi.vercel.app/users/authenticate', {
        email,
        password,
      });

      const userId = response.data.id;
      setLoggedInUserId(userId);

      navigation.navigate('DrawerScreens', { userId });
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  };



  return (
    <YStack fullscreen bg={"$red10"} justifyContent="center" alignItems="center" padding="$2" gap="$2" minWidth={250} space="$2">
      <Title>
        Tela de Login
      </Title>
      <Image source={pombabranca} style={{ width: 115, height: 100 }} resizeMode='stretch' />
      <Input id="email" placeholder="aluno.00000@unicap.br" value={email} onChangeText={setEmail} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <Input id="password" placeholder="Senha" textContentType="password" secureTextEntry value={password} onChangeText={setPassword} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <Button size="$3" theme="active" onPress={authLogin}>
        <Button.Text>
          Entrar
        </Button.Text>
      </Button>
      <Button size="$3" variant="outlined" onPress={toRegister}>
        <Button.Text>
          Criar conta
        </Button.Text>
      </Button>
      <Description></Description>
    </YStack>
  )
}