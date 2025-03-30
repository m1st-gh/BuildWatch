import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import "@/global.css";
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import { ScrollView } from "./components/ui/scroll-view";
import { HStack } from "./components/ui/hstack";
import { VStack } from "./components/ui/vstack";
import { Box } from "./components/ui/box";
import { Icon } from "./components/ui/icon";
import { LineChart } from "./components/LineChart";
import { Database } from "lucide-react-native";

// A simple TabBarIcon component using FontAwesome
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

// Home screen with your original content
function HomeScreen() {
  const [cpuData, setCpuData] = useState<number[]>(new Array(14).fill(0));
  const [memoryData, setMemoryData] = useState<number[]>(new Array(14).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData((prev) => [...prev.slice(1), Math.floor(Math.random() * 30) + 20]);
      setMemoryData((prev) => [...prev.slice(1), Math.floor(Math.random() * 30) + 20]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView>
      <VStack space="lg" className="overflow-hidden m-4 rounded-xl">
        <HStack space="lg" className="p-4 bg-white rounded-xl">
          <Box className="flex-1 rounded-md bg-[#f4f4f4] overflow-hidden">
            <LineChart
              data={cpuData}
              height={100}
              lineColor="#007aff"
              fillColor="#d0e2f6"
              fillGradient={false}
            />
          </Box>
          <Box className="flex-1 rounded-md bg-[#f4f4f4] overflow-hidden">
            <LineChart
              height={100}
              data={memoryData}
              lineColor="#007aff"
              fillColor="#d0e2f6"
              fillGradient={false}
            />
          </Box>
        </HStack>
        <HStack space="md" className="p-4 bg-white rounded-xl">
          <Box className="bg-[#d0e2f6] p-4 rounded-md">
            <Icon size={64} as={Database} />
          </Box>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GluestackUIProvider>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "0.0.0.0",
              tabBarIcon: ({ color }) => <TabBarIcon name="server" color={color} />,
            }}
          />
          {/* Additional tabs can be added here */}
        </Tab.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
