import React, { useContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JobContext } from '../context/JobContext';
import { ThemeContext } from '../context/ThemeContext';
import SavedJobItem from '../components/SavedJobItem';
import DarkModeToggle from '../components/DarkModeToggle';

const SavedJobsScreen = ({ navigation }: any) => {
  const { savedJobs, removeJob } = useContext(JobContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      {/* Header Section */}
      <View style={[styles.curvedSection, isDarkMode && styles.darkCurvedSection]}>
        <Text style={styles.title}>Saved Jobs</Text>
        <DarkModeToggle />
      </View>

      {/* Display Saved Jobs */}
      {savedJobs.length === 0 ? (
        <Text style={[styles.emptyText, isDarkMode && styles.darkText]}>No saved jobs yet.</Text>
      ) : (
        <FlatList
          data={savedJobs}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) =>
            item ? (
              <SavedJobItem
                job={item}
                onApply={() => navigation.navigate('ApplicationForm', { job: item })}
                onRemove={() => removeJob(item.id)}
                isDarkMode={isDarkMode} // Pass the isDarkMode prop
              />
            ) : null
          }
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Find Job Button */}
      <TouchableOpacity
        style={[styles.findJobButton, isDarkMode && styles.darkFindJobButton]}
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'JobFinder' }] })}
      >
        <Text style={[styles.findJobButtonText, isDarkMode && styles.darkFindJobButtonText]}>
          Find Job
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  curvedSection: {
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#000',
    marginBottom: 20,
    alignItems: 'center',
  },
  darkCurvedSection: {
    backgroundColor: '#000',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
  darkText: {
    color: '#ccc',
  },
  listContainer: {
    paddingBottom: 20,
  },
  findJobButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  darkFindJobButton: {
    backgroundColor: '#333',
  },
  findJobButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  darkFindJobButtonText: {
    color: '#fff',
  },
});

export default SavedJobsScreen;
