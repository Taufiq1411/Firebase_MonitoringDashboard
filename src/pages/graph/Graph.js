import { useState, useEffect } from 'react'

import styles from './Graph.module.css'

import firebase from 'firebase/app'
import 'firebase/database'

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2'

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
  } from 'chart.js';
import { ChartCursorEventArgsDescriptionMetadata } from 'igniteui-webcomponents-core';

  ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
  );
  

export default function Graph() {

    const [predic, setPredic] = useState("")
    const [volt, setVolt] = useState("")
    const [time, setTime] = useState("")

    const [predicArr, setPredicArr] = useState([])
    const [voltArr, setVoltArr] = useState([])
    const [timeArr, setTimeArr] = useState([])
  
    useEffect(() => {
      voltage();
      prediction();
      timenow();
    }, [volt, predic, timenow]);

    var timenow = () => {
        const current = new Date()
        const time = current.toLocaleTimeString("en-US", {
            hour12: false
        })
        setTime(time);
        setTimeArr((t)=>[...t,time])
        console.log(timeArr);
    }
  
    var fetchVoltage = firebase.database().ref('UsersData/tegangan');
      var voltage = async () => {
        fetchVoltage.on('value', (snapshot) => {
        const volt = snapshot.val().toFixed(2);
        setVolt(volt);
        console.log(volt);
        setVoltArr((teg)=>[...teg,volt])
        console.log(voltArr);
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

    const data = {
        labels: timeArr,
        datasets: [{
            data: voltArr,
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            // tension: 0.5
        }]
    }
    
    const options = {
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                min: 2,
                max: 15,
                ticks: {
                    stepSize: 1,
                    callback: (value) => value + 'V'
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }

    
return (
    <div>
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Battery Voltage Graphic</h1>
            </div>
        </header>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Line data={data} options={options}></Line>
        </div>
    </div>
    )
  }