import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/MyContext';
import { useContext } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import { TaskContext } from '../Context/TaskContext';
import TaskCard from '../components/TaskCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
const bgColors = ['#9ECFF5', '#B4C89F', '#FFF9C4', '#D4A9DD'];

const HomeScreen = () => {
  const { colors, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { tasks } = useContext(TaskContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={[{ backgroundColor: colors.bgColor }, styles.container]}>
      <View style={styles.headerBox}>
        <View style={styles.headerLeft}>
          <Text style={[styles.hiiText, { color: colors.Headtext }]}>Hii, </Text>
          <Text style={[styles.headerText, { color: colors.Headtext }]}>Welcome Back 😊</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
            {
              isDarkMode ? <Icon2 name="sun" size={20} color={colors.Headtext} /> : <Icon3 name="moon" size={20} color={colors.Headtext} />
            }
          </TouchableOpacity>
          <Icon name="bell" style={[styles.bellIcon, { color: colors.Headtext }]} />
        </View>
      </View>
      <View style={styles.taskBox}>{
        tasks && tasks.length > 0 ? <Text style={[styles.taskText, { color: colors.Bodytext }]}>My Tasks</Text> : ''
      }
        <View style={styles.taskList}>
          <FlatList
            data={tasks}
            renderItem={({ item, index }) => (
              <TaskCard
                title={item.title}
                description={item.description ? item.description : "No description added"}
                completed={item.completed}
                bgColor={bgColors[index % bgColors.length]}
                date={item.date}
                id={item.id}
              />
            )}
            keyExtractor={item => item.id}
            ListEmptyComponent={
              <View style={styles.noTasksContainer}>
                <Text style={[styles.taskText, { color: colors.Bodytext }]}>No Tasks added yet</Text>
                <Button mode="contained" icon="plus" onPress={() => navigation.navigate('AddTask')}>Add Task</Button>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    flex: 1,
    minHeight: '100%',
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  hiiText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    flex: 1,
    justifyContent: 'flex-end',
  },
  bellIcon: {
    fontSize: 20,
  },
  taskBox: {
    padding: 0,
  },
  taskText: {
    marginTop: 0,
    padding: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  noTasksContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    padding: 10,
  },
});