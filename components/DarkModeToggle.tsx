import React from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Switch
        value={isDarkMode}
        onValueChange={toggleTheme}
        thumbColor={isDarkMode ? '#fff' : '#000'}
        trackColor={{ false: '#ccc', true: '#555' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
});

export default DarkModeToggle;
