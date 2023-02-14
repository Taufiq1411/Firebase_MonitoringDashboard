import { useState, useEffect } from 'react'

import styles from './GaugeDisplay.module.css'

import firebase from 'firebase/app'
import 'firebase/database'

import { database } from '../firebase/config'

import GaugeChart from 'react-gauge-chart'

export default function GaugeDisplay() {

  const [predic, setPredic] = useState("")
  const [volt, setVolt] = useState("")

  useEffect(() => {
    voltage();
    prediction();
  }, [volt, predic]);

  var fetchVoltage = firebase.database().ref('UsersData/tegangan');
    var voltage = async () => {
      fetchVoltage.on('value', (snapshot) => {
      const volt = snapshot.val().toFixed(2);
      setVolt(volt);
      console.log(volt);
      });
  };

  var fetchPrediction = firebase.database().ref('UsersData/prediksi');
    var prediction = async () => {
      fetchPrediction.on('value', (snapshot) => {
      const predic = snapshot.val();
      setPredic(predic);
      console.log(predic);
      });
  };

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.col1}>
                <h1>Tegangan Baterai</h1>
                    <GaugeChart id="gauge-chart3" 
                        nrOfLevels={30} 
                        colors={["#FF5F6D", "#FFC371"]} 
                        arcWidth={0.3} 
                        percent={volt/100*6}
                        width={0.3}
                        hideText= {true}
                        animate= {false}
                    />
                <h2>{volt} V</h2>
            </div>
            <div className={styles.col2}>
                <h1>Sisa Waktu Nyala</h1>
                    <GaugeChart id="gauge-chart3" 
                        nrOfLevels={30} 
                        colors={["#63A4FF", "#83EAF1"]} 
                        arcWidth={0.3} 
                        percent={predic/100*3} 
                        width={0.3}
                        hideText= {true}
                        animate= {false}
                    />
                <h2>{predic} Menit</h2>
            </div>
        </div>   
    </div>
  )
}