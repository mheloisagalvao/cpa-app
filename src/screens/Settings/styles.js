import styled from "styled-components/native";
import theme from "src/theme";

export const Container = styled.View`
  background-color: ${theme.COLORS.WHITE};
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const LogoStyle = styled.Image`
margin: 25%;
`

export const Box = styled.View`
    background-color: ${theme.COLORS.WHITE};
    height: 45%;
    width: 335px;
    margin: 15px;
    padding: 15px;
    border-radius: 24px;
    gap: 2px;
`

export const Title = styled.Text`
    color: ${theme.COLORS.BLACK};
    font-size: 24px;
`

export const Description = styled.Text`
    color: ${theme.COLORS.GRAY};
    font-size: 14px;
    margin-bottom: 15px;
`

export const ButtonContainer = styled(View)`
  align-items: flex-end;
  justify-content: flex-end;
  margin-right: 15px;
`;

export const Button = styled(PressableScale)`
  margin-top: 100%;
  height: 50px;
  background-color: ${colors.unicap};
  border-radius: 25px;
  aspect-ratio: 1;
  justify-content: center;
  align-items: center;
`;

export const ActionTrayContainer = styled(ActionTray)`
  background-color: #FFF;
  flex: 1;
  padding: 25px;
  position: relative;
`;

export const HeadingContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const HeadingText = styled(Text)`
  font-size: 20px;
  font-weight: 600;
`;

export const CloseButton = styled(PressableScale)`
  height: 24px;
  aspect-ratio: 1;
  border-radius: 20px;
  background-color: ${colors.Palette.surface};
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const ContentText = styled(Text)`
  font-size: 16px;
  margin-top: 15px;
  margin-bottom: 25px;
  font-weight: 600;
  color: ${colors.Palette.text};
`;

export const ContinueButton = styled(PressableScale)`
  background-color: ${colors.Palette.primary};
  justify-content: center;
  align-items: center;
  height: 55px;
  flex: 1;
  align-self: center;
  width: 100%;
  border-radius: 25px;
`;

export const ButtonText = styled(Text)`
  color: ${colors.Palette.background};
  font-weight: bold;
  font-size: 16px;
`;

