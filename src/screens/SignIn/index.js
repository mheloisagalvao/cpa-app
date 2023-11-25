import React, { useState } from 'react';
import { Container, Description, Title } from "./styles"
import { Input, Button, YStack } from 'tamagui';
import axios from 'axios';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://server-teal-two.vercel.app/users', {
        email,
        password,
        name: "Nome do Usuário", 
        login: "nome_usuario",  
        courseName: curso,
        avatarUrl: "https://example.com/avatar.jpg"  
      });

      console.log(response.data);

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  return (
    <YStack fullscreen bg={"$red10"} justifyContent="center" alignItems="center" padding="$2" gap="$2">
      <Title>
        Tela de Cadastro
      </Title>
      <Input id="email" placeholder="aluno.00000@unicap.br" value={email} onChangeText={setEmail} />
      <Input id="curso" paddingHorizontal={72} placeholder="curso" value={curso} onChangeText={setCurso} />
      <Input id="ra" paddingHorizontal={80} placeholder="ra" value={ra} onChangeText={setRa} />
      <Input id="password" paddingHorizontal={72} placeholder="Senha" textContentType="password" secureTextEntry value={password} onChangeText={setPassword} />

      <Button size="$3" theme="active" onPress={handleSubmit}>
        <Button.Text>
          Entrar
        </Button.Text>
      </Button>
      {/* Botão para voltar */}
      <Button size="$3" variant="outlined">
        <Button.Text>
          Voltar
        </Button.Text>
      </Button>
    </YStack>
  );
}