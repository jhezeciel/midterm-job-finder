import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type JobItemProps = {
  job: {
    id: string;
    title: string;
    company: string;
  };
  onApply: () => void;
  onRemove: () => void;
  isDarkMode: boolean;
};

const SavedJobItem = ({ job, onApply, onRemove, isDarkMode }: JobItemProps) => {
  return (
    <View
      style={[
        styles.card,
        isDarkMode ? styles.darkCard : styles.lightCard,
      ]}
    >
      <Text
        style={[
          styles.jobTitle,
          isDarkMode ? styles.darkJobTitle : styles.lightJobTitle,
        ]}
      >
        {job.title}
      </Text>
      <Text
        style={[
          styles.jobCompany,
          isDarkMode ? styles.darkJobCompany : styles.lightJobCompany,
        ]}
      >
        {job.company}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={onApply} style={[styles.button, styles.applyButton]}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onRemove} style={[styles.button, styles.removeButton]}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  lightCard: {
    backgroundColor: '#fafafa',
    borderColor: '#e0e0e0',
  },
  darkCard: {
    backgroundColor: '#212121',
    borderColor: '#424242',
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
  },
  lightJobTitle: {
    color: '#333',
  },
  darkJobTitle: {
    color: '#eee',
  },
  jobCompany: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  lightJobCompany: {
    color: '#777',
  },
  darkJobCompany: {
    color: '#bbb',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#333',  // Light Gray
    borderColor: '#D3D3D3',  // Light Gray
  },
  removeButton: {
    backgroundColor: 'rgba(255, 77, 77, 0.2)',  // Light Transparent Red
    borderColor: '#FF4D4D',  // Red border to match transparency
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default SavedJobItem;
