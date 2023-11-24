import styled from "styled-components/native";
import theme from "src/theme";

export const Container = styled.View`
  background-color: ${theme.COLORS.white};
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

