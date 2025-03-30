import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { JobContext } from '../context/JobContext';
import uuid from 'react-native-uuid';
import { Ionicons } from '@expo/vector-icons';
import DarkModeToggle from '../components/DarkModeToggle';
import Toast from 'react-native-toast-message';

const JobFinderScreen = ({ navigation }: any) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { savedJobs, saveJob } = useContext(JobContext);

  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://empllo.com/api/v1');
        const data = await response.json();
        const jobsWithId = data.jobs.map((job: any) => ({ ...job, id: uuid.v4() as string }));
        setJobs(jobsWithId);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSaveJob = (job: any) => {
    const companyName = job.company || 'Unknown Company'; 
  
    if (!savedJobs.some((savedJob) => savedJob.id === job.id)) {
      saveJob(job);
  
      Toast.show({
        type: 'success',
        text1: 'Job has been saved!',
        text2: `${job.title} at ${companyName} has been added to your saved jobs.`,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'This job is already saved.',
        text2: `${job.title} at ${companyName} is already in your saved jobs.`,
      });
    }
  };
  

  const filteredJobs = jobs?.filter((job) =>
    job?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '') ||
    job?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase() || '')
  ) || [];

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <TextInput
        style={[styles.input, isDarkMode && styles.darkInput]}
        placeholder="Search jobs..."
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.jobCard, isDarkMode && styles.darkJobCard]}>
            <Text style={[styles.jobTitle, isDarkMode && styles.darkText]}>{item.title}</Text>
            <Text style={[styles.jobCompany, isDarkMode && styles.darkText]}>{item.company}</Text>
            <Text style={[styles.jobSalary, isDarkMode && styles.darkText]}>💰 Salary: {item.salary}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleSaveJob(item)}>
                <Ionicons
                  name={savedJobs.some((savedJob) => savedJob.id === item.id) ? 'bookmark' : 'bookmark-outline'}
                  size={28}
                  color={isDarkMode ? '#ccc' : '#555'}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ApplicationForm', { job: item })} style={[styles.button, styles.applyButton]}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
        <TouchableOpacity onPress={() => navigation.navigate('JobFinder')}>
          <Ionicons name="briefcase-outline" size={32} color={isDarkMode ? '#ccc' : '#555'} />
        </TouchableOpacity>

        <DarkModeToggle />

        <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
          <Ionicons name="bookmark-outline" size={32} color={isDarkMode ? '#ccc' : '#555'} />
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  input: {
    height: 42,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 16,
  },
  darkInput: {
    backgroundColor: '#222',
    borderColor: '#444',
    color: '#fff',
  },
  jobCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  darkJobCard: {
    backgroundColor: '#000',
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  darkText: {
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  darkBottomNav: {
    backgroundColor: '#222',
    borderColor: '#333',
  },
});

export default JobFinderScreen;