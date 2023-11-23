import { Container, Description, Title } from "./styles"
import { Button, Input, Label, Switch, XStack, YStack } from 'tamagui'
import { Image } from 'react-native'
import pombabranca from '../../assets/PombaBranca_PNG.png'

export default function Login(){
  return(
   <YStack fullscreen bg={"$red10"} justifyContent="center" alignItems="center" padding="$2" gap="$2">
    <Title>
      Tela de Login
    </Title>
    <Image source={pombabranca} height={250} width={100}/>
    <Input id="email" placeholder="aluno.00000@unicap.br"  />
    <Input  id="password" paddingHorizontal={72} placeholder="Senha" textContentType="password" />
    <Button  size="$3" theme="active" >
          <Button.Text>
            Entrar
          </Button.Text>
        </Button>
        <Button size="$3" variant="outlined">
          <Button.Text>
            Criar conta
          </Button.Text>
        </Button>
    <Description></Description>
   </YStack>
  )
}