import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { selectStyling, textFieldStyling } from "../layout/mui-styles";

export default function Charts({coin}) {
  const [coinData, setCoinData] = useState([]);
  const [graphColor, setGraphColor] = useState("#ffc400");
  const [dateRange, setDateRange] = useState("1y");

  const coinId = coin;

  const fetchData = async () => {
    const today = new Date();
    const startDate = new Date();

    switch (dateRange) {
      case "1y":
        startDate.setFullYear(today.getFullYear() - 1);
        break;
      case "6m":
        startDate.setMonth(today.getMonth() - 6);
        break;
      case "3m":
        startDate.setMonth(today.getMonth() - 3);
        break;
      case "1m":
        startDate.setMonth(today.getMonth() - 1);
        break;
      case "1w":
        startDate.setDate(today.getDate() - 7);
        break;
      default:
        startDate.setFullYear(today.getFullYear() - 1);
    }

    const formattedStartDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;
    const formattedEndDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart?vs_currency=usd&days=max&interval=daily`
    );

    const data = await response.json()

    const historicalData = data.prices
      .filter(([timestamp]) => new Date(timestamp) >= new Date(formattedStartDate) && new Date(timestamp) <= new Date(formattedEndDate))
      .map(([timestamp, price]) => ({ date: new Date(timestamp).toLocaleDateString(), price }));

    setCoinData(historicalData);
  };


  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p style={{ color: "#5a5a5a" }}>Date: {label}</p>
          <p style={{ color: "#5a5a5a" }}>
            Price: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const handleGraphColorChange = (event) => {
    setGraphColor(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <div>
      <hr/>
      <h1>Historical {coinId} Data</h1>
      <FormControl sx={selectStyling} variant="outlined" style={{ marginBottom: "16px", width: "100px" }}>
        <InputLabel htmlFor="graph-color">Graph Color</InputLabel>
        <Select
          value={graphColor}
          onChange={handleGraphColorChange}
          label="Color"
          sx={textFieldStyling}
          variant="filled"
          inputProps={{
            name: 'graph-color',
            id: 'graph-color',
          }}
        >
          <MenuItem value="#01D3D2">blue</MenuItem>
          <MenuItem value="#90ee90">green</MenuItem>
          <MenuItem value="#ffc400">yellow</MenuItem>
          <MenuItem value="#F06292">pink</MenuItem>
          <MenuItem value="#D8A3DC">purple</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ marginBottom: '16px', marginLeft: '16px', width: '100px' }}
        sx={selectStyling}
      >
        <InputLabel htmlFor="date-range">Date Range</InputLabel>
        <Select
          value={dateRange}
          onChange={handleDateRangeChange}
          label="Date Range"
          sx={textFieldStyling}
          variant="filled"
          inputProps={{
            name: 'date-range',
            id: 'date-range',
          }}
        >
          <MenuItem value="1y">1 year</MenuItem>
          <MenuItem value="6m">6 months</MenuItem>
          <MenuItem value="3m">3 months</MenuItem>
          <MenuItem value="1m">1 month</MenuItem>
          <MenuItem value="1w">1 week</MenuItem>
        </Select>
      </FormControl>

      {coinData &&
        <ResponsiveContainer className="chart-cont">
          <LineChart data={coinData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="purple" />
            <XAxis dataKey="date" stroke={graphColor} />
            <YAxis stroke={graphColor} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="cardinal" dataKey="price" stroke={graphColor} />
          </LineChart>
        </ResponsiveContainer>}
    </div>
  );
};
