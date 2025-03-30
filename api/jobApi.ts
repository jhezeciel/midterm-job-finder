const fetchData = async () => {
    try {
      const response = await axios.get('https://empllo.com/api/v1');
      console.log('Full Response:', response); // Logs the entire response object
      console.log('Response Data:', response.data); // Logs only the data from the response
      setData(response.data); // Set the data if it's correct
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    }
  };
  