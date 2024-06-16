import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Text } from 'react-native';
import { H4, H6, XStack, YStack } from 'tamagui';

import { ScreenContent } from '~/components/ScreenContent';
import { useTipContext } from '~/components/tipContext';

interface EmployeeTip {
  server: string;
  amount: number;
}

export default function transactionList() {
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

  const { history } = context;

  return (
    <>
      <ScreenContent>
        <XStack flex={1} alignItems="center" justifyContent="center">
          <YStack flex={1} maxHeight={350}>
            {history.length > 0 ? (
              <>
                <YStack alignItems="center" space="$5" style={{ paddingBottom: 20 }}>
                  <H4>List of transactions</H4>
                </YStack>
                <FlashList
                  data={history.reverse()}
                  estimatedItemSize={200}
                  renderItem={({ item }: { item: EmployeeTip }) => {
                    return (
                      <YStack space="$5" style={{ paddingBottom: 10 }}>
                        <XStack flex={1} alignItems="center" justifyContent="space-between">
                          <Text>{item.server}</Text>
                          <Text>{`€ ${item.amount}`}</Text>
                        </XStack>
                      </YStack>
                    );
                  }}
                />
              </>
            ) : (
              <YStack flex={1} alignItems="center" justifyContent="center">
                <H4>No data</H4>
                <H6>Please, try again later</H6>
              </YStack>
            )}
          </YStack>
        </XStack>
      </ScreenContent>
    </>
  );
}
