import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/MyContext';
import { useContext } from 'react';
import { Button } from 'react-native-paper';
import { TaskContext } from '../Context/TaskContext';
import { Chip } from 'react-native-paper';


interface TaskCardProps {
  title: string;
  description: string;
  completed: boolean;
  bgColor: string;
  date: string;
  id: string;
}


const TaskCard = ({ title, description, completed, bgColor, date, id }: TaskCardProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { deleteTask, toggleTask } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const colors = {
    Headtext: '#2B0F4E',
    Bodytext: '#000',
  }

  return (
    <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>

      <View style={[styles.card, { backgroundColor: bgColor }]}>
        {
          completed && (
            <Chip icon="calendar-multiple-check" mode="outlined" style={styles.chip}>Completed</Chip>
          )
        }

        <Text style={[styles.title, { color: colors.Headtext }]}>{title}
        </Text>

        <Text style={[styles.date, { color: colors.Bodytext }]}>{date.split('T')[0]}</Text>
        {
          isOpen ? (
            <Text style={[styles.description, { color: colors.Bodytext }]}>
              {description}
            </Text>
          ) : (
            <Text style={[styles.description, { color: colors.Bodytext }]}>
              Click to view description
            </Text>
          )
        }


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
            onPress={() => toggleTask(id)}
          >
            {
              completed ? 'Mark as Incomplete' : 'Mark as Completed'
          }
          </Button>
        </View>

      </View>
    </TouchableOpacity>
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
    fontSize: 33,
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
  chip: {
    marginLeft: 'auto',
    color: 'blue'
  },
});

export default TaskCard;