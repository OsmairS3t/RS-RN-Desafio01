import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const foundTask = tasks.find(task => task.title === newTaskTitle)
    if (foundTask) {
      Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome", 
        [{
          text: "Ok",
          onPress: ()=>{return}
        }]
      )
    } else {
      const newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks(oldState => [...oldState, newTask]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskSearched = updatedTasks.find(item => item.id === id)
    if (!taskSearched) return;
   
    taskSearched.done = !taskSearched.done;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const filteredTasks = tasks.filter(task => task.id !== id);
            setTasks(filteredTasks);
          }
        },
        {
          text: "Não",
          onPress: () => {
            return;
          }  
        }
      ]
    )
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const taskSearched = updatedTasks.find(item => item.id === taskId)
    if (!taskSearched) return;
   
    taskSearched.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})