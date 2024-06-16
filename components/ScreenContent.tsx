import { H2, XStack } from 'tamagui';

import { Container } from './Container';

type ScreenContentProps = {
  children?: React.ReactNode;
};

export const ScreenContent = ({ children }: ScreenContentProps) => {
  return (
    <Container>
      <XStack justifyContent="center">
        <H2>TIP CALCULATOR</H2>
      </XStack>
      {children}
    </Container>
  );
};
