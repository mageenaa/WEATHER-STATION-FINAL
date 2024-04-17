const express = require('express')
const admin = require('firebase-admin')
const axios = require('axios')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
// integration with PostgreSQL
const { Pool } = require('pg')
const moment = require('moment')



// Initialize Firebase Admin SDK
const serviceAccount = require('D:/Zaidan codes/backend_weatherstation/iot-colabs-firebase-adminsdk-tlty1-4ecd25f75e.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://iot-colabs-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const db = admin.database()
const ref1 = db.ref('Node1')
const ref2 = db.ref('Node2')
const ref3 = db.ref('Node3')

app.use(bodyParser.json())

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'forecastdata',
  password: '30230745',
  port: 5432,
})

// Function to transform data from node1 or node2 into the format expected by FastAPI
async function saveDataToPostgreSQLnode1(data) {
  const client = await pool.connect();
  try {
    const waktuFormatted = moment(data.Waktu, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    const query = `
      INSERT INTO node1 (angin, cuaca, curah, hari, kecepatan_angin_kmh, kecepatan_angin_ms,
        kecepatan_angin_rpm, kelembaban, suhu, tekanan_udara, tingkat_cahaya, tingkat_gerimis, waktu)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
      data.Angin,
      data.Cuaca,
      parseFloat(data.Curah), // convert to numeric
      data.Hari,
      parseFloat(data['Kecepatan Angin kmh']), // convert to numeric
      parseFloat(data['Kecepatan Angin ms']), // convert to numeric
      parseFloat(data['Kecepatan Angin rpm']), // convert to numeric
      parseFloat(data.Kelembaban), // convert to numeric
      parseFloat(data.Suhu), // convert to numeric
      parseFloat(data['Tekanan Udara']), // convert to numeric
      parseFloat(data['Tingkat Cahaya']), // convert to numeric
      parseFloat(data['Tingkat Gerimis']), // convert to numeric
      waktuFormatted, // menggunakan format waktu yang sesuai
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

async function saveDataToPostgreSQLnode2(data) {
  const client = await pool.connect();
  try {
    const waktuFormatted = moment(data.Waktu, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    const query = `
      INSERT INTO node2 (angin, cuaca, curah, hari, kecepatan_angin_kmh, kecepatan_angin_ms,
        kecepatan_angin_rpm, kelembaban, suhu, tekanan_udara, tingkat_cahaya, tingkat_gerimis, waktu)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
      data.Angin,
      data.Cuaca,
      parseFloat(data.Curah), // convert to numeric
      data.Hari,
      parseFloat(data['Kecepatan Angin kmh']), // convert to numeric
      parseFloat(data['Kecepatan Angin ms']), // convert to numeric
      parseFloat(data['Kecepatan Angin rpm']), // convert to numeric
      parseFloat(data.Kelembaban), // convert to numeric
      parseFloat(data.Suhu), // convert to numeric
      parseFloat(data['Tekanan Udara']), // convert to numeric
      parseFloat(data['Tingkat Cahaya']), // convert to numeric
      parseFloat(data['Tingkat Gerimis']), // convert to numeric
      waktuFormatted, // menggunakan format waktu yang sesuai
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

async function saveDataToPostgreSQLnode3(data) {
  const client = await pool.connect();
  try {
    const waktuFormatted = moment(data.Waktu, 'HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
    const query = `
      INSERT INTO node3 (angin, cuaca, curah, hari, kecepatan_angin_kmh, kecepatan_angin_ms,
        kecepatan_angin_rpm, kelembaban, suhu, tekanan_udara, tingkat_cahaya, tingkat_gerimis, waktu)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    `;
    const values = [
      data.Angin,
      data.Cuaca,
      parseFloat(data.Curah), // convert to numeric
      data.Hari,
      parseFloat(data['Kecepatan Angin kmh']), // convert to numeric
      parseFloat(data['Kecepatan Angin ms']), // convert to numeric
      parseFloat(data['Kecepatan Angin rpm']), // convert to numeric
      parseFloat(data.Kelembaban), // convert to numeric
      parseFloat(data.Suhu), // convert to numeric
      parseFloat(data['Tekanan Udara']), // convert to numeric
      parseFloat(data['Tingkat Cahaya']), // convert to numeric
      parseFloat(data['Tingkat Gerimis']), // convert to numeric
      waktuFormatted, // menggunakan format waktu yang sesuai
    ];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

app.get('/node1', (req, res) => {
  // Read data from Firebase Realtime Database
  ref1.once('value', (snapshot) => {
    const data = snapshot.val()
    res.json(data); // Send the retrieved data as JSON response
    // Save the data to PostgreSQL
    saveDataToPostgreSQLnode1(data)
      .then(() => console.log('Data saved to Node1 PostgreSQL successfully'))
      .catch((error) => console.error('Error saving data to Node1 PostgreSQL:', error))
  }).catch((error) => {
    console.error('Error fetching data from Firebase Node1:', error)
    res.status(500).send('Internal Server Error')
  })
})

app.get('/node2', (req, res) => {
  // Read data from Firebase Realtime Database
  ref2.once('value', (snapshot) => {
    const data = snapshot.val()
    res.json(data); // Send the retrieved data as JSON response
    // Save the data to PostgreSQL
    saveDataToPostgreSQLnode2(data)
      .then(() => console.log('Data saved to Node2 PostgreSQL successfully'))
      .catch((error) => console.error('Error saving data to Node2 PostgreSQL:', error))
  }).catch((error) => {
    console.error('Error fetching data from Firebase Node2:', error)
    res.status(500).send('Internal Server Error')
  })
})

app.get('/node3', (req, res) => {
  // Read data from Firebase Realtime Database
  ref3.once('value', (snapshot) => {
    const data = snapshot.val()
    res.json(data); // Send the retrieved data as JSON response
    // Save the data to PostgreSQL
    saveDataToPostgreSQLnode3(data)
      .then(() => console.log('Data saved to Node3 PostgreSQL successfully'))
      .catch((error) => console.error('Error saving data to Node3 PostgreSQL:', error))
  }).catch((error) => {
    console.error('Error fetching data from Firebase Node2:', error)
    res.status(500).send('Internal Server Error')
  })
})

// Function to fetch historical weather data from PostgreSQL for node1
async function getHistoricalWeatherDataFromPostgreSQL() {
  try {
    // Connect to PostgreSQL database
    const client = await pool.connect();

    // Query to fetch historical weather data from the node1 table
    const query = 'SELECT * FROM node1 ORDER BY waktu DESC LIMIT 2';

    // Execute the query
    const result = await client.query(query);

    // Fetch the historical weather data
    const historicalData = result.rows;

    // Release the database connection
    client.release();

    return historicalData;
  } catch (error) {
    console.error('Error fetching historical weather data from PostgreSQL:', error);
    throw error;
  }
}

// Endpoint to fetch historical weather data from PostgreSQL
app.get('/historical', async (req, res) => {
  try {
    // Fetch historical weather data from PostgreSQL
    const historicalData = await getHistoricalWeatherDataFromPostgreSQL();

    // Send the historical weather data as JSON response
    res.json(historicalData);
  } catch (error) {
    console.error('Error fetching historical weather data:', error);
    res.status(500).send('Internal Server Error');
  }
});

function transformDataForPrediction(data) {
  if (data && data.angin && data.curah && data.kelembaban && data.kecepatan_angin_kmh && data.tekanan_udara && data.suhu && data.tingkat_cahaya && data.tingkat_gerimis) {
    return {
      arah_angin: data.angin.trim(),
      hujan: parseInt(data.curah) || 0,
      humidity: parseInt(data.kelembaban) || 0,
      kecepatan_angin: parseFloat(data.kecepatan_angin_kmh) || 0,
      tekanan_udara: parseFloat(data.tekanan_udara) || 0,
      temperature: parseFloat(data.suhu) || 0,
      tingkat_cahaya: parseInt(data.tingkat_cahaya) || 0,
      tingkat_gerimis: parseInt(data.tingkat_gerimis) || 0
    };
  } else {
    console.error('Data tidak lengkap atau tidak sesuai');
    return null; // atau kembalikan nilai default jika perlu
  }
}

function transformData(data) {
  return {
    arah_angin: data.Angin.trim(),
    hujan: data.Curah || 0,
    humidity: data.Kelembaban || 0,
    kecepatan_angin: data['Kecepatan Angin kmh'] || 0,
    tekanan_udara: data['Tekanan Udara'] || 0,
    temperature: data.Suhu || 0,
    tingkat_cahaya: data['Tingkat Cahaya'] || 0,
    tingkat_gerimis: data['Tingkat Gerimis'] || 0
  }
}

// Endpoint to fetch data from Firebase, transform data, and send it to FastAPI for prediction
app.post('/prediction1', async (req, res) => {
  try {
    // Fetch data from Firebase for node1
    const node1Data = await ref1.once('value').then((snapshot) => snapshot.val())

    // Transform data into the format expected by FastAPI
    const transformedData = transformData(node1Data)

    // Send transformed data to FastAPI for prediction
    const predictionResponse = await axios.post('https://0vq17zp5-8000.asse.devtunnels.ms/predict1', transformedData)

    // Return prediction result to the client
    res.json(predictionResponse.data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Endpoint to fetch data from Firebase, transform data, and send it to FastAPI for prediction
app.post('/prediction2', async (req, res) => {
  try {
    // Fetch data from Firebase for node1
    const node2Data = await ref2.once('value').then((snapshot) => snapshot.val())

    // Transform data into the format expected by FastAPI
    const transformedData2 = transformData(node2Data)

    // Send transformed data to FastAPI for prediction
    const predictionResponse2 = await axios.post('https://0vq17zp5-8000.asse.devtunnels.ms/predict2', transformedData2)

    // Return prediction result to the client
    res.json(predictionResponse2.data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

// Endpoint to fetch data from Firebase, transform data, and send it to FastAPI for prediction
app.post('/prediction3', async (req, res) => {
  try {
    // Fetch data from Firebase for node1
    const node3Data = await ref3.once('value').then((snapshot) => snapshot.val())

    // Transform data into the format expected by FastAPI
    const transformedData3 = transformData(node3Data)

    // Send transformed data to FastAPI for prediction
    const predictionResponse3 = await axios.post('https://0vq17zp5-8000.asse.devtunnels.ms/predict3', transformedData3)

    // Return prediction result to the client
    res.json(predictionResponse3.data)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
})

async function predictWeatherFor1Day(data) {
  try {
    // Kirim data yang dipersiapkan ke endpoint FastAPI untuk prediksi 1 hari ke depan
    const predictionResponse = await axios.post('https://0vq17zp5-8000.asse.devtunnels.ms/forecast1', data);
    
    // Ambil hasil prediksi dari respons FastAPI
    const predictionResult = predictionResponse.data;
    
    // Mengembalikan hasil prediksi
    return predictionResult;
  } catch (error) {
    console.error('Error predicting weather for 1 day ahead:', error);
    throw error;
  }
}

async function predictWeatherFor2Days(data) {
  try {
    // Kirim data yang dipersiapkan ke endpoint FastAPI untuk prediksi 2 hari ke depan
    const predictionResponse = await axios.post('https://0vq17zp5-8000.asse.devtunnels.ms/forecast2', data);
    
    // Ambil hasil prediksi dari respons FastAPI
    const predictionResult = predictionResponse.data;
    
    // Mengembalikan hasil prediksi
    return predictionResult;
  } catch (error) {
    console.error('Error predicting weather for 2 days ahead:', error);
    throw error;
  }
}

app.post('/forecast1', async (req, res) => {
  try {
    // Ambil data historis dari PostgreSQL
    const historicalData = await axios.get('http://localhost:3000/historical');
    
    // Pastikan data historis ditemukan dan memiliki minimal dua entri
    if (historicalData && historicalData.data && historicalData.data.length >= 2) {
      // Transformasikan data pertama dari JSON historis menjadi format yang sesuai
      const transformedData1 = transformDataForPrediction(historicalData.data[0]);
      
      // Kirim data pertama untuk prediksi 1 hari ke depan
      const prediction1 = await predictWeatherFor1Day(transformedData1);
      
      // Kirim hasil prediksi sebagai respons
      res.json(prediction1);
    } else {
      console.error('Data historis tidak lengkap atau tidak ditemukan');
      res.status(500).send('Internal Server Error');
    }
  } catch (error) {
    console.error('Error predicting weather for 1 day ahead:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/forecast2', async (req, res) => {
  try {
    // Ambil data historis dari PostgreSQL
    const historicalData = await axios.get('http://localhost:3000/historical');
    
    // Pastikan data historis ditemukan dan memiliki minimal dua entri
    if (historicalData && historicalData.data && historicalData.data.length >= 2) {
      // Transformasikan data kedua dari JSON historis menjadi format yang sesuai
      const transformedData2 = transformDataForPrediction(historicalData.data[1]);
      
      // Kirim data kedua untuk prediksi 2 hari ke depan
      const prediction2 = await predictWeatherFor2Days(transformedData2);
      
      // Kirim hasil prediksi sebagai respons
      res.json(prediction2);
    } else {
      console.error('Data historis tidak lengkap atau tidak ditemukan');
      res.status(500).send('Internal Server Error');
    }
  } catch (error) {
    console.error('Error predicting weather for 2 days ahead:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/data_prediksi', async (req, res) => {
  try {
    // Mendapatkan cuaca dari endpoint /prediction1
    const cuacaPrediction = await axios.post('https://0vq17zp5-3000.asse.devtunnels.ms/prediction1');
    
    // Mendapatkan suhu dari endpoint /node1
    const node1Data = await axios.get('https://0vq17zp5-3000.asse.devtunnels.ms/node1');
    const suhu = node1Data.data.Suhu;
    
    // Mendapatkan cuaca besok dari endpoint /forecast1
    const cuacaBesok = await axios.post('https://0vq17zp5-3000.asse.devtunnels.ms/forecast1');
    
    // Mendapatkan cuaca lusa dari endpoint /forecast2
    const cuacaLusa = await axios.post('https://0vq17zp5-3000.asse.devtunnels.ms/forecast2');
    
    // Mendapatkan suhu besok dari data JSON pertama di endpoint /historical
    const historicalData = await axios.get('https://0vq17zp5-3000.asse.devtunnels.ms/historical');
    const suhuBesok = parseFloat(historicalData.data[0].suhu);
    
    // Mendapatkan suhu lusa dari data JSON kedua di endpoint /historical
    const suhuLusa = parseFloat(historicalData.data[1].suhu);
    
    // Membuat objek data prediksi
    const dataPrediksi = {
      Cuaca: cuacaPrediction.data.hasil, // Cuaca dari /prediction1
      Suhu: suhu, // Suhu dari /node1
      "Cuaca Besok": cuacaBesok.data.hasil, // Cuaca besok dari /forecast1
      "Cuaca Lusa": cuacaLusa.data.hasil, // Cuaca lusa dari /forecast2
      "Suhu Besok": suhuBesok, // Suhu besok dari data pertama di /historical
      "Suhu Lusa": suhuLusa // Suhu lusa dari data kedua di /historical
    };
    
    // Mengirimkan data prediksi sebagai respons
    res.json(dataPrediksi);
  } catch (error) {
    console.error('Error fetching prediction data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Backend Weather Station listening on port ${port}`)
})