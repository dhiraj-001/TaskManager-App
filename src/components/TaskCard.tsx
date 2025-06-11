import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../Context/MyContext';
import { useContext } from 'react';
import { Button } from 'react-native-paper';
import { TaskContext } from '../Context/TaskContext';


interface TaskCardProps {
  title: string;
  description: string;
  completed: boolean;
  bgColor: string;
  date: string;
  id: string;
}


const TaskCard = ({ title, description, completed, bgColor,date,id }: TaskCardProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { deleteTask, toggleTask } = useContext(TaskContext);
 
  const colors = {
  Headtext:  '#2B0F4E' ,
  Bodytext: '#000',
 }

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <Text style={[styles.title, { color: colors.Headtext }]}>{title}</Text>
      <Text style={[styles.date, { color: colors.Bodytext }]}>{date}</Text>
      <Text style={[styles.description, { color: colors.Bodytext }]}>
        {description}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.dltbutton}
          icon="delete"
          mode="contained-tonal"
          onPress={() => deleteTask(id)}
        >
          Delete
        </Button>
        <Button
          style={styles.edtbutton}
          icon="pencil"
          mode="outlined"
          textColor={colors.Headtext}
         
        >
          Edit
        </Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 30,
  },
  edtbutton: {
    marginTop: 10,
    flex: 4,
    alignSelf: 'flex-end',
  },
  dltbutton: {
    marginTop: 10,
    flex: 1,
    alignSelf: 'flex-end',
  },
  date: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default TaskCard;