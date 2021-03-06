// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.right - margin.left;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import the data from the Data, data.csv file.
d3.csv("data.csv").then(function(newsData){
    console.log(newsData);

    //healthcare Low vs Obsesity; parse the data for these
    newsData.forEach(function(data){
        data.healthcareLow = +data.income;
        data.obesity = +data.age;
    });

    //create the scale function
    var xLinearScale = d3.scaleLinear()
        .domain([30000, d3.max(newsData, data => data.income)])
        .range([5, width])
        .nice();
    var yLinearScale = d3.scaleLinear()
        .domain([30, d3.max(newsData, data => data.age)])
        .range([height, 0]);

    //axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //add axis to chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    chartGroup.append("g")
        .call(leftAxis);

    //create the circles of data
    chartGroup.selectAll("circle")
        .data(newsData)
        .enter()
        .append("circle")
        .attr("cx", data => xLinearScale(data.income))
        .attr("cy", data => yLinearScale(data.age))
        .attr("r", "15")
        .attr("fill", "lightblue")
        .attr("opacity", ".9")
        .attr("stroke-width", "1");

    chartGroup.append("g")
        .selectAll("text")
        .data(newsData)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class","stateText")
        .style("fill", "white")
        .style("font", "10px sans-serif")
        .style("font-weight", "bold")
        .text(function(data) 
            {return data.abbr;})
        .attr("x", data => xLinearScale(data.income))
        .attr("y", data => yLinearScale(data.age));
    
    //add titles on axis
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-margin.left+40)
        .attr("x", 0-(height/2))
        .attr("dy", "1em")
        .attr("class", "axisTest")
        .text("Age")

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Income");
  

}).catch(function(error){
    console.log(error);
});