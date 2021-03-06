import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setSkills(oldSkills => [...oldSkills, data]);
  }

  function handleRemoveSkill(id: string) {
    setSkills(oldSkills => oldSkills.filter(skill => skill.id != id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Maby</Text>
      <Text style={styles.greetings}>{greeting}</Text>
      <TextInput
        style={styles.input}
        placeholder={'New skill'}
        placeholderTextColor={'#666'}
        onChangeText={setNewSkill}
      />
      <Button title={'Add'} onPress={handleAddNewSkill} />

      <Text
        style={[
          styles.title,
          { marginTop: 48, marginBottom: 30, alignSelf: 'flex-start' },
        ]}
      >
        My Skills
      </Text>

      <FlatList
        data={skills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111217',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#272B34',
    color: '#FFFFFF',
    fontSize: 24,
    padding: Platform.OS === 'ios' ? 20 : 15,
    borderRadius: 8,
  },
  greetings: {
    color: '#FFFFFF',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 32,
  },
});
