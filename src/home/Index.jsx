import React,{useState,useEffect} from 'react';
import './App.css'; 
import { accountService } from '@/_services';
import * as d3 from 'd3'
//var React = require('react');
var QRCode = require('qrcode.react');
function Home() {
    const user = accountService.userValue;
    const access = false;

    useEffect(() => {

        // Create a dataset of pets and the amount of people that own them
        let dataSet = [
          {subject: "heart-rate", count: 100},
          {subject: "Temperature", count: 100.2},
          {subject: "Blood Pressure", count: 120},
            {subject: "Blood pressure", count: 80},
        ]
        // Generate a p tag for each element in the dataSet with the text: Subject: Count 
        d3.select('#pgraphs').selectAll('p').data(dataSet).enter().append('p').text(dt => dt.subject + ": " + dt.count)
        
        // Bar Chart:
          const getMax = () => { // Calculate the maximum value in the DataSet
            let max = 0
            dataSet.forEach((dt) => {
                if(dt.count > max) {max = dt.count}
            })
            return max
          }
       
          
          // Create each of the bars and then set them all to have the same height(Which is the max value)
          d3.select('#BarChart').selectAll('div').data(dataSet) 
          .enter().append('div').classed('bar', true).style('height', `${getMax()}px`)
      
          //Transition the bars into having a height based on their corresponding count value
          d3.select('#BarChart').selectAll('.bar')
          .transition().duration(1000).style('height', bar => `${bar.count}px`)
            .style('width', '80px').style('margin-right', '10px').delay(300) // Fix their width and margin
          
          
           // Generate random data for our line where x is [0,15) and y is between 0 and 100
           let lineData = []
           const heart = 100
           for(let i = 0; i < 15; i++) {
              lineData.push({x: i + 1, y: Math.round(Math.random() * 100)})
           }
      
           // Create our scales to map our data values(domain) to coordinate values(range)
           let xScale = d3.scaleLinear().domain([0,15]).range([0, 300])
           let yScale = d3.scaleLinear().domain([0,100]).range([300, 0]) // Since the SVG y starts at the top, we are inverting the 0 and 300.
           
           // Generate a path with D3 based on the scaled data values
           let line = d3.line()
            .x(dt => xScale(dt.x))
            .y(dt => yScale(dt.y))
           
           // Generate the x and y Axis based on these scales
           let xAxis = d3.axisBottom(xScale)
           let yAxis = d3.axisLeft(yScale)
           
           // Create the horizontal base line
           d3.select('#LineChart').selectAll('path').datum(lineData) // Bind our data to the path element
          .attr('d', d3.line().x(dt => xScale(dt.x)) // Set the path to our line function, but where x is the corresponding x
          .y(yScale(0))).attr("stroke", "blue").attr('fill', 'none') // Set the y to always be 0 and set stroke and fill color
      
      
          
           d3.select('#LineChart').selectAll('path').transition().duration(1000) // Transition the line over 1 sec
           .attr('d', line) // Set the path to our line variable (Which corresponds the actual path of the data)
           
           // Append the Axis to our LineChart svg
           d3.select('#LineChart').append("g")
           .attr("transform", "translate(0, " + 300 + ")").call(xAxis)
      
           d3.select('#LineChart').append("g")
           .attr("transform", "translate(0, 0)").call(yAxis)
      }, [])

    return (
        <div className="content-container">
            {access ?
            <>
            <div className="container-fluid">
                <div className="jumbotron">
                    {console.log(user)}
                    <h1>Hi Dr. {user.firstName} {user.lastName}!</h1>
                </div>
            </div>
            <div className="container-fluid col-5">
                <div classname="jumborton">
                    {/* <QRCode value="http://google.com" />, */}
                    <p>Scan this QR code from patient's device</p>
                    <QRCode value={user.id}/>,
                    
                </div>
            </div>
            </>
            :
            <>
            <div className="container-fluid">
                <div className="jumbotron">
                    {console.log(user)}
                    {/* <h1>Hi Dr. {user.firstName} {user.lastName}!</h1> */}
                    <h1>Patient's Profile</h1>
                </div>
            </div>
            <div className="container-fluid col-5">
                <div classname="jumborton">
                    <p>Name: Hammad Farooq</p>
                    <p>Gender: Male</p>
                    <p>Age: 32</p>
                    {/* <QRCode value="http://google.com" />,
                    <p>Scan this QR codabce from patient's device</p>
                    <QRCode value={user.id}/>, */}
                    
                </div>
            </div>
            <div>
            {/* // Create a div to house our p tags 
                // Create a div to house our BarChart
                // Create an SVG and path for our LineChart*/}
                
      <div id="pgraphs"></div> 
      <div id="BarChart"></div> 
      <svg id="LineChart" width = {350} height = {350}><path/></svg> 
    </div>

            </>
            }
        </div>
    );
}

export { Home };
