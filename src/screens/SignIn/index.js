import { Container, Description, Title } from "./styles"
import { Button, Input, Label, Switch, XStack, YStack } from 'tamagui'


export default function SignIn(){
  return(
   <YStack fullscreen bg={"$red10"} justifyContent="center" alignItems="center" padding="$2" gap="$2">
    <Title>
      Tela de Cadastro
    </Title>
    <Input id="email" placeholder="aluno.00000@unicap.br"  />
    <Input id="curso" paddingHorizontal={72}  placeholder="curso"  />
    <Input id="ra" paddingHorizontal={80}  placeholder="ra"  />

    <Input  id="password" paddingHorizontal={72} placeholder="Senha" textContentType="password" />
    <Input  id="password" paddingHorizontal={72} placeholder="Senha" textContentType="password" />

    <Button  size="$3" theme="active" >
          <Button.Text>
            Entrar
          </Button.Text>
        </Button>
        <Button size="$3" variant="outlined">
          <Button.Text>
            Voltar
          </Button.Text>
        </Button>
    <Description></Description>
   </YStack>
  )
}