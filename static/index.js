const chart = new Chartist.Bar('.ct-chart',{});


const lines = ["a", "b", "c"];

// Get the initial chart data
function getChartData(queryString = "?n=30&n=50") {
  console.log('here')
  axios
    .get("/titanic" + queryString)
    .then(res => {
      let titanic = res.data;
      // console.log(titanic)
      const seriesData = [];
      // const series = ["diet", "gym", "finance"];
      const series = ["Age"];

      // for (let i = 0, length = series.length; i < length; i += 1) {
      const currSeries = series[0];

      // have male and female counts
      let male = 0
      let female = 0

    const age = titanic["Age"]
    const sex = titanic["Sex"]
    let ageArray = []
    let sexArray = []

    for (let key of Object.keys(age)) {
      // add all ages into ageArray
      ageArray.push(age[key])
      // console.log(key + " -> " + age[key])
    }

    for (let key of Object.keys(sex)) {
      // add all sex into sexArray
      sexArray.push(sex[key])
    }
    console.log(ageArray)
    console.log(sexArray)

    for (let i=0; i<ageArray.length; i+=1) {
      if (sexArray[i] == "female") {
        female += 1
      } else {
        male += 1
      }
    }
    

    console.log(female)
    console.log(male)

      const chartData = {
        labels: ["Female", "Male"],
        series: [[female, male]]
      };

      // let options = {
      //   high: 10,
      //   low: -10
      // };

      chart.update(chartData);
      
      // updateLines(columnList.children);
    })
    .catch(err => console.error(err));
}

// Updating the chart data
function updateChart() {
  let queryString;
  // const items = columnList.children;

  // Get both input fields from the time frame section
  const timeFrames = document.querySelectorAll(".control-date > input");

  // Grab all time ranges
  for (let i = 0, length = timeFrames.length; i < length; i += 1) {
    time = timeFrames[i].value;

    // Start or add to the query string
    if (typeof queryString === "undefined") {
      queryString = "?n=" + time;
    } else {
      queryString += "&n=" + time;
    }
  }


  getChartData(queryString);
}

// Update the lines drawn with the correct colors
function updateLines(items) {
  let currLine = 0;
  // Grab all the checked columns
  for (let i = 0, length = items.length; i < length; i += 1) {
    // Only color the checked off lines
    if (items[i].classList.contains("checked")) {
      currentLine = document.querySelector(
        ".ct-series-" + lines[currLine] + " .ct-line"
      );
      currentPoints = document.querySelectorAll(
        ".ct-series-" + lines[currLine] + " .ct-point"
      );
      currentLine.style.cssText =
        "stroke: " + items[i].children[0].value + "!important;";

      // Color every point
      for (let j = 0, length = currentPoints.length; j < length; j += 1) {
        currentPoints[j].style.cssText =
          "stroke: " + items[i].children[0].value + "!important;";
      }
      currLine += 1;
    }
  }
}

getChartData();