import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { JobProvider } from './context/JobContext';
import { ThemeProvider } from './context/ThemeContext';
import JobFinderScreen from './screens/JobFinderScreen';
import SavedJobsScreen from './screens/SavedJobsScreen';
import ApplicationFormScreen from './screens/ApplicationFormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <JobProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="JobFinder">
            <Stack.Screen name="JobFinder" component={JobFinderScreen} />
            <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
            <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </JobProvider>
  );
};

export default App;
