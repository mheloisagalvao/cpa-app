import React, { useState } from 'react';
import { Container, Title } from "./styles";
import { Input, Button, YStack, RadioGroup, XStack, Label } from 'tamagui';
import axios from 'axios';
import { useUser } from '../../contexts/userContext';
import { colors } from '../../utils/colors';


const cursos = [
  { name: 'Sistemas para Internet' },
  { name: 'Ciência da Computação' },
  { name: 'Jogos Digitais' }
]

export default function SignIn({ navigation }) {
  const authLogin = () => {
    navigation.navigate('Home');
  }

  const { setLoggedInUserId } = useUser();
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('2');
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');

  const handleCursoChange = (value) => {
    setCurso(value);
  };


  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://server-gold-pi.vercel.app/users', {
        email,
        password,
        name,
        login,
        courseName: curso,
        avatarUrl: "https://www.github.com/athospugliesedev.png"
      });

      const userId = response.data.id;

      setLoggedInUserId(userId);

      console.log(response.data);

      if (response.status === 200) {
        authLogin();
      }

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <YStack fullscreen bg={"$red10"} justifyContent="center" alignItems="center" padding="$2" gap="$2" minWidth={250} space="$2">
      <Title>
        Tela de Cadastro
      </Title>
      <Input id="login" placeholder="Usuário" value={login} onChangeText={setLogin} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <Input id="name" placeholder="Nome completo" value={name} onChangeText={setName} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <Input id="email" placeholder="aluno.00000@unicap.br" value={email} onChangeText={setEmail} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <RadioGroup aria-labelledby="Select one item" defaultValue={curso} name="form" >
        <YStack width={250}>
          <RadioGroupItemWithLabel size="$3" value="2" label="Sistemas para Internet" onChange={handleCursoChange} />
          <RadioGroupItemWithLabel size="$3" value="3" label="Ciência da Computação" onChange={handleCursoChange} />
          <RadioGroupItemWithLabel size="$3" value="4" label="Jogos Digitais" onChange={handleCursoChange} />
        </YStack>
      </RadioGroup>
      <Input id="ra" placeholder="RA" value={ra} onChangeText={setRa} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />
      <Input id="password" placeholder="Senha" textContentType="password" secureTextEntry value={password} onChangeText={setPassword} height={40} width={250} borderWidth={2} borderColor={colors.coolGray[200]} />

      <Button size="$3" theme="active" onPress={handleSubmit}>
        <Button.Text>
          Entrar
        </Button.Text>
      </Button>
      <Button size="$3" variant="outlined">
        <Button.Text>
          Voltar
        </Button.Text>
      </Button>
    </YStack>
  );
}

export function RadioGroupItemWithLabel(props) {
  const id = `radiogroup-${props.value}`;

  return (
    <XStack width={300} alignItems="center" space="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
}
