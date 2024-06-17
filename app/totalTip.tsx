import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text } from 'react-native';
import { H4, XStack, YStack } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';
import { useTipContext } from '~/components/tipContext';

interface EmployeeTip {
  name: string;
  amount: number;
}

export default function TotalTip() {
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

  const { totalByEmployee } = context;

  const value = totalByEmployee();

  return (
    <>
      <ScreenContent>
        <XStack flex={1} alignItems="center" justifyContent="center">
          <YStack flex={1} maxHeight={450}>
            <YStack alignItems="center" space="$5" style={{ paddingBottom: 20 }}>
              <H4>Total per employee</H4>
            </YStack>
            <FlashList
              data={value}
              estimatedItemSize={50}
              renderItem={({ item }: { item: EmployeeTip }) => {
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
          </YStack>
        </XStack>
      </ScreenContent>
    </>
  );
}
