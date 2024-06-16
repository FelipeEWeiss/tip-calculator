import { useFonts } from 'expo-font';
import { SplashScreen, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import { TabBarIcon } from '~/components/navigation/TabBarIcon';
import { TipProvider } from '~/components/tipContext';
import config from '~/tamagui.config';

export default function Layout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <TamaguiProvider config={config}>
      <TipProvider>
        <Theme name="light">
          <Tabs
            screenOptions={{
              headerShown: false,
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="transactionList"
              options={{
                title: 'Transactions',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="totalTip"
              options={{
                title: 'Total',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'cash' : 'cash-outline'} color={color} />
                ),
              }}
            />
          </Tabs>
        </Theme>
      </TipProvider>
    </TamaguiProvider>
  );
}
