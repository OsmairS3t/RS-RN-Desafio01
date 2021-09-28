import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TaskItem2({ editTask, toggleTaskDone, task, removeTask }: TaskItemProps) {
  const [editting, setEditting] = useState(false);
  const [titleEditted, setTitleEditted] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setEditting(true);
  }

  function handleCancelEditing() {
    setTitleEditted(task.title);
    setEditting(false);
  }

  function handleSubmitEditing() {
    //editTask(task.id, titleEditted)
    setEditting(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (editting) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [editting])

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={titleEditted}
            onChangeText={setTitleEditted}
            editable={editting}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          >
            {task.title}
          </TextInput>
        </TouchableOpacity>
      </View>
      {
        editting ?
          <TouchableOpacity>
            <Icon
              name="x"
              size={12}
              color="#b2b2b2"
              onPress={handleCancelEditing}
            />
          </TouchableOpacity>
        :
          <View>
            <TouchableOpacity>
              <Icon
                name={editIcon}
                size={12}
                color="#b2b2b2"
                onPress={handleStartEditing}
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(task.id)}
            >
              <Image source={trashIcon} style={{ opacity: editting ? 0.2 : 1 }} />
            </TouchableOpacity>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  divider: {
    width: 1,
    color: 'rgba(196,196,196,0.24)',
  }
})