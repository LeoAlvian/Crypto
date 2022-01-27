import React from 'react';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Col, Row, Typography } from 'antd'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
  );

const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName}) => {

    console.log({coinHistory})
    const coinPrice = []
    const coinTimestamp = []


    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory.data.history[i].price);
        coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleDateString());
    }

    // console.log({coinPrice})
    // console.log({coinTimestamp})

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
            // tension: 0.1,
          },
        ],
      };

    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
    
    return (
        <>
            <Row className='chart-header'>
                <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
                <Col className='price-container'>
                    <Title level={5} className='price-change'>Change: {coinHistory?.data?.change}%</Title>
                    <Title level={3} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
