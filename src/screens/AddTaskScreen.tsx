import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/MyContext';
import { useContext } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import { TaskContext } from '../Context/TaskContext';
import { TextInput, Button, Snackbar } from 'react-native-paper';

const bgColors = ['#9ECFF5', '#B4C89F', '#FFF9C4', '#D4A9DD'];

const AddTaskScreen = () => {
  const { colors, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { tasks, addTask } = useContext(TaskContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [task, setTask] = React.useState({
    title: '',
    description: '',
    date: new Date().toISOString(),
    completed: false,
  });

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[{ backgroundColor: colors.bgColor }, styles.container]}>
        <View style={styles.headerBox}>
          <View style={styles.headerLeft}>

            <Text style={[styles.headerText, { color: colors.Headtext }]}>Add Tasks 😊</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
              {
                isDarkMode ? <Icon2 name="sun" size={20} color={colors.Headtext} /> : <Icon3 name="moon" size={20} color={colors.Headtext} />
              }
            </TouchableOpacity>


          </View>
        </View>
        <View style={styles.taskBox}>
          <TextInput
            label="Title"
            value={task.title}
            mode="outlined"
            activeUnderlineColor={colors.bgColor}
            style={[{ backgroundColor: colors.Headtext }, styles.input]}
            onChangeText={(text) => setTask({ ...task, title: text })}
          />
          <TextInput
            label="Description"
            multiline={true}
            value={task.description}
            style={[{ backgroundColor: colors.Headtext }, styles.input]}
            onChangeText={(text) => setTask({ ...task, description: text })}
          />
          <Button
            mode="elevated"
            textColor={colors.bgColor}
            rippleColor={colors.Headtext}
            style={[{ backgroundColor: colors.Bodytext }, styles.button]}
            onPress={() => {
              addTask({ ...task, id: Date.now().toString() })
              setTask({
                title: '',
                description: '',
                date: new Date().toISOString(),
                completed: false,
              })
              onToggleSnackBar()
            }}
          >
            Add Task
          </Button>
        </View>
        <Snackbar
          visible={visible}
          duration={2000}
          style={[{ backgroundColor: "#310E5A" }, styles.snackbar]}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
          }}>
          Task Added Successfully
        </Snackbar>
      </View>
    </ScrollView>

  );
};

export default AddTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 30,
    flex: 1,
    minHeight: '100%',

  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  headerText: {
    fontSize: 25,
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

  input: {
    marginBottom: 10,
    fontSize:16,
    padding: 10,
  },
  taskBox: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',

  },
  button: {
    borderRadius: 10,
    padding: 10,
    fontSize:20,
  },
  snackbar: {
    borderRadius: 10,
    padding: 10,
    borderWidth:1,
    borderColor:"#fff",
  },
});