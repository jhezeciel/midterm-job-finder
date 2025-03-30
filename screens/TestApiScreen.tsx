import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const TestApiScreen = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://empllo.com/api/v1');
        console.log('API Response:', response.data);
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please check the API URL or your internet connection.');
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>API Data:</Text>
        {error ? (
          <Text style={{ color: 'red' }}>{error}</Text>
        ) : data ? (
          <Text>{JSON.stringify(data, null, 2)}</Text>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default TestApiScreen;
