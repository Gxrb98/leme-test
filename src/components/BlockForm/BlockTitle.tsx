import { Wrapper, Titulo, SubTitle } from "./searchFormStyles.ts"
import type { Props } from "./BlockFormTypes.ts"
export const BlockTitle = ({ t1, t2 }: Props) => {
  return (
    <Wrapper>
        <Titulo>{t1}</Titulo>
        <SubTitle>{t2}</SubTitle>
    </Wrapper>
   
  )
}
