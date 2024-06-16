import { FlashList } from '@shopify/flash-list';
import { useState } from 'react';
import { Text } from 'react-native';
import { H4, H6, Input, RadioGroup, XStack, YStack } from 'tamagui';

import { Button, ButtonText } from '../tamagui.config';

import { RadioButton } from '~/components/RadioButton';
import { ScreenContent } from '~/components/ScreenContent';
import { useTipContext } from '~/components/tipContext';

export default function Home() {
  const [tipAmount, setTipAmount] = useState('');
  const [serverName, setServerName] = useState('Sean');

  const context = useTipContext();

  if (!context) {
    return (
      <ScreenContent>
        <XStack flex={1} alignItems="center" justifyContent="center">
          <Text>Context not available</Text>
        </XStack>
      </ScreenContent>
    );
  }

  const { calculateTip, history } = context;

  function handleformatAmount(value: string) {
    let numericValue = value.replace(/[^0-9.]/g, '');

    const parts = numericValue.split('.');
    if (parts.length > 2) {
      numericValue = parts[0] + '.' + parts.slice(1).join('');
    }

    if (numericValue.includes('.')) {
      const [integerPart, decimalPart] = numericValue.split('.');
      numericValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }

    setTipAmount(numericValue);
  }

  function handleCalculate() {
    const parsedAmount = Number(tipAmount);
    calculateTip(parsedAmount, serverName);
  }

  const lastHistoryItem = history[history.length - 1];
  const showCard = history.length !== 0;

  const parsedList = showCard
    ? Object.entries(lastHistoryItem.employeesAmount).map(([name, amount]) => ({
        name,
        amount,
      }))
    : undefined;

  return (
    <ScreenContent>
      <XStack flex={1} alignItems="center" justifyContent="center">
        <YStack flex={1} space="$5">
          <XStack>
            <Input
              flex={1}
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={(text) => handleformatAmount(text)}
              value={tipAmount}
            />
          </XStack>
          <RadioGroup
            aria-labelledby="Select the server"
            defaultValue={serverName}
            name="form"
            onValueChange={(text) => setServerName(text)}>
            <YStack width={300} space="$1">
              <H6>Select the server</H6>
              <RadioButton size="$4" value="Sean" label="Sean" />
              <RadioButton size="$4" value="Joan" label="Joan" />
              <RadioButton size="$4" value="Nuala" label="Nuala" />
            </YStack>
          </RadioGroup>
          <Button onPress={handleCalculate}>
            <ButtonText>Calculate</ButtonText>
          </Button>
          <XStack minHeight={140}>
            {showCard && (
              <FlashList
                data={parsedList}
                estimatedItemSize={50}
                renderItem={({ item }) => {
                  return (
                    <YStack space="$5" style={{ paddingBottom: 10 }}>
                      <XStack flex={1} alignItems="center" justifyContent="space-between">
                        <Text>{item.name}</Text>
                        <Text>{`€ ${item.amount}`}</Text>
                      </XStack>
                    </YStack>
                  );
                }}
              />
            )}
          </XStack>
        </YStack>
      </XStack>
    </ScreenContent>
  );
}
