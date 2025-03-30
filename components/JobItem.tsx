import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Job } from '../types';

interface JobItemProps {
  job: Job;
  onSave: (job: Job) => void;
  onApply: (job: Job) => void;
  isSaved: boolean;
}

const JobItem: React.FC<JobItemProps> = ({ job, onSave, onApply, isSaved }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{job.title}</Text>
      <Text>{job.company}</Text>
      <Text>{job.salary}</Text>
      <Button title={isSaved ? 'Saved' : 'Save Job'} onPress={() => onSave(job)} />
      <Button title="Apply" onPress={() => onApply(job)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 16, fontWeight: 'bold' }
});

export default JobItem;
