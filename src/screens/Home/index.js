import { Text, View } from "react-native"
import { Container, Description, Title } from "./styles"
import { BlurredCard } from "../../routes/components/BlurredCard"
import Settings from "../Settings"


export default function Home(){
  return(
   <Container>
    <BlurredCard />
    <View style={{width: "100%", position: 'absolute'}}>
      <Settings />
    </View>
   </Container>
  )
}