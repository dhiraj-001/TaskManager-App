import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {TaskContext} from '../Context/TaskContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation} from '@react-navigation/native';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const {addTask} = useContext(TaskContext);
  const navigation = useNavigation();

  const handleAddTask = () => {
    if (title.trim() === "") {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    addTask({
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      due: date,
    });

    setTitle('');
    setDescription('');
    setDate(new Date());
    navigation.goBack();
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Task</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate: any) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTask; 