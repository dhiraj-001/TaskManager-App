import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import AddTaskScreen from './AddTaskScreen';
import { ThemeContext } from '../Context/MyContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {colors, isDarkMode} = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.Bodytext,
        },
        tabBarActiveTintColor: colors.bgColor,
      }}>
        <Tab.Screen name="My tasks" component={HomeScreen} options={{
          tabBarIcon: () => (
            <Icon name="tasks" color={colors.bgColor} style={{fontSize: 20}} />
          )
        }} />
        <Tab.Screen name="AddTask" component={AddTaskScreen} options={{
          tabBarIcon: () => (
            <Icon2 name="add-task" color={colors.bgColor} style={{fontSize: 20}} />
          )
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;