import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import DarkModeToggle from '../components/DarkModeToggle';
import { useTheme } from '../context/ThemeContext';

const ApplicationForm = ({ navigation, route }: any) => {
  const { isDarkMode } = useTheme();
  const { job } = route.params;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    reason: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contactNumber: '',
    reason: '',
  });

  // Email and Contact Number Validation
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateContact = (number: string) => /^[0-9]{10,15}$/.test(number);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', contactNumber: '', reason: '' };

    // Validation Checks
    if (!formData.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address.';
      isValid = false;
    }

    if (!formData.contactNumber || !validateContact(formData.contactNumber)) {
      newErrors.contactNumber = 'Enter a valid contact number (10-15 digits).';
      isValid = false;
    }

    if (!formData.reason) {
      newErrors.reason = 'Please explain why you should be hired.';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Show Alert and Navigate Directly to JobFinderScreen
    Alert.alert('Success', 'Your application has been submitted!', [
      {
        text: 'OK',
        onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'JobFinder' }],
        }),
      }
    ]);
  };

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={styles.curvedSection}>
        <Text style={styles.title}>Apply for {job.title}</Text>
        <DarkModeToggle />
      </View>

      {/* Form Section */}
      <ScrollView contentContainerStyle={styles.form}>
        {[
          { label: 'Full Name', field: 'name', placeholder: 'Enter your name', isLarge: false },
          { label: 'Email', field: 'email', placeholder: 'Enter your email', isLarge: false },
          { label: 'Contact Number', field: 'contactNumber', placeholder: 'Enter contact number', isLarge: false },
          { label: 'Why should we hire you?', field: 'reason', placeholder: 'Your response', isLarge: true },
        ].map((item) => (
          <View key={item.field} style={styles.inputContainer}>
            <TextInput
              style={item.isLarge ? styles.inputLarge : styles.input}
              placeholder={item.placeholder}
              placeholderTextColor="#888"
              keyboardType={item.field === 'contactNumber' ? 'phone-pad' : 'default'}
              onChangeText={(text) => handleInputChange(item.field, text)}
              value={formData[item.field]}
              multiline={item.isLarge}
            />
            {errors[item.field] ? <Text style={styles.errorText}>{errors[item.field]}</Text> : null}
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Submit Application</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#222',
  },
  curvedSection: {
    height: 150,
    backgroundColor: '#000',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputLarge: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 12,
    marginTop: 4,
  },
});

export default ApplicationForm;
