import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskProps {
  taskId: number
  TaskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const todoWithSameTitle = tasks.find(task => task.title === newTask.title)

    if(todoWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    
    setTasks(oldState => [...oldState, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map( task => ({ ...task }))

    const foundItem = updatedTasks.find(task => task.id === id)

    if(!foundItem) return

    foundItem.done = !foundItem.done
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter( task => task.id !== id)

          setTasks(updatedTasks)
        }
      }
    ])

  }

  function handleEditTask ({taskId, TaskNewTitle}: EditTaskProps) {
    const updateTasks = tasks.map(task => ({...task}))

    const taskToBeUpdate = updateTasks.find(task => task.id === taskId)

    if(!taskToBeUpdate) return

    taskToBeUpdate.title = TaskNewTitle

    setTasks(updateTasks)
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