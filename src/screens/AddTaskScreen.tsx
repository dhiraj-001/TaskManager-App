import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { ThemeContext } from '../Context/MyContext';
import { useContext } from 'react';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import { TaskContext } from '../Context/TaskContext';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import DatePicker from 'react-native-date-picker'

const bgColors = ['#9ECFF5', '#B4C89F', '#FFF9C4', '#D4A9DD'];

const AddTaskScreen = () => {
  const { colors, isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { tasks, addTask } = useContext(TaskContext);
  const [visible, setVisible] = React.useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [task, setTask] = React.useState({
    title: '',
    description: '',
    due: new Date(),
    completed: false,
  });

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)


  return (
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={{ backgroundColor: colors.bgColor }}
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={[{ backgroundColor: colors.bgColor }, styles.container]}>
        <View style={styles.headerBox}>
          <View style={styles.headerLeft}>
            <Text style={[styles.headerText, { color: colors.Headtext }]}>Add Tasks 😊</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? (
                <Icon2 name="sun" size={20} color={colors.Headtext} />
              ) : (
                <Icon3 name="moon" size={20} color={colors.Headtext} />
              )}
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
            textColor={colors.bgColor}
            style={[{ backgroundColor: colors.Headtext }, styles.input]}
            onChangeText={(text) => setTask({ ...task, description: text })}
          />
          <View style={styles.datebtnContainer}>
            <Button mode='elevated' textColor={colors.bgColor}
              rippleColor={colors.Bodytext}
              icon="calendar"
              style={[{ backgroundColor: colors.Headtext }, styles.datebtn]} onPress={() => setOpen(true)}>
              Due Date
            </Button>
            <Button
              mode="elevated"
              icon="plus"
              textColor={colors.bgColor}
              rippleColor={colors.Headtext}
              style={[{ backgroundColor: colors.Bodytext }, styles.button]}
              onPress={() => {
                if (!task.title.trim()) {
                  Alert.alert('Error', 'Please enter a task title');
                  return;
                }
              
                addTask({ ...task, id: Date.now().toString(), due: date });
                setTask({
                  title: '',
                  description: '',
                  due: date,
                  completed: false,
                });
                onToggleSnackBar();
              }}>
              Add Task
            </Button>
          </View>


          <DatePicker
            modal
            mode='datetime'
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />
        </View>
        <Snackbar
          visible={visible}
          duration={2000}
          style={[{ backgroundColor: '#310E5A' }, styles.snackbar]}
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
    height: '100%',
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginBottom: 20,
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
    fontSize: 16,
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
    fontSize: 20,
    flex: 3,
    borderWidth: 1,
    borderColor: "#8E24AA",
  },
  datebtn: {
    borderRadius: 10,
    paddingVertical: 10,
    fontSize: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
  },
  snackbar: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
  dateButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
  },
  datebtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
});