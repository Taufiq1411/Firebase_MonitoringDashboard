import React, { useEffect, useState } from "react";

import styles from './GaugeNew.module.css'

import firebase from 'firebase/app'
import 'firebase/database'

import { database } from '../firebase/config'

const GaugeNew = () => {

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

    const size = 250;
    const strokeWidth=40;
    const percentage1 = volt;
    const percentage2 = predic;

    const [progress1, setProgress1] = useState(0);
    useEffect(() => {
        setProgress1(percentage1);
    }, [percentage1]);

    const [progress2, setProgress2] = useState(0);
    useEffect(() => {
        setProgress2(percentage2);
    }, [percentage2]);

    const viewBox = `-50 0 300 250`;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * Math.PI * 2;
    const dash1 = (progress1 * 6 * circumference) / 100;
    const dash2 = (progress2 * 3 * circumference) / 100;

  return (
    <div>
    <div className={styles.container}>
        <div className={styles.col1}>
        <h1 className="text-2xl font-bold text-gray-900">Tegangan Baterai</h1>
            <svg width={size} height={size} viewBox={viewBox} preserveAspectRatio="xMinYMin meet" class="svg-content">
            <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                fill="none"
                stroke="#FF5F6D"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeDasharray={[dash1, circumference - dash1]}
                strokeLinecap="round"
                style={{ transition: "all 0.5s" }}
            />
            <text
                fill="black"
                fontSize="30px"
                x="42.5%"
                y="47.5%"
                dy="20px"
                textAnchor="middle"
            >
                {`${percentage1} V`}
            </text>
            </svg>
        </div>
        <div className={styles.col2}>
            <h1 className="text-2xl font-bold text-gray-900">Sisa Waktu Nyala</h1>
            <svg width={size} height={size} viewBox={viewBox}>
            <circle
                fill="none"
                stroke="#ccc"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                fill="none"
                stroke="#63A4FF"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                strokeDasharray={[dash2, circumference - dash2]}
                strokeLinecap="round"
                style={{ transition: "all 0.5s" }}
            />
            <text
                fill="black"
                fontSize="30px"
                x="41.5%"
                y="47.5%"
                dy="20px"
                textAnchor="middle"
            >
                {`${percentage2} Menit`}
            </text>
            </svg>
        </div>
    </div>   
    </div>  
  );
};

export default GaugeNew;




