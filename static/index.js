const chart = new Chartist.Bar('.ct-chart',{});
      
// Get the initial chart data
function getChartData(queryString = "?n=30&n=50") {
  axios
    .get("/titanic" + queryString)
    .then(res => {
      let titanic = res.data;

      // have male and female counts
      let male = 0
      let female = 0
      const sex = titanic["Sex"] //json containing sex
      //intialize sex array
      let sexArray = []

      for (let key of Object.keys(sex)) {
        // add all sex into sexArray
        sexArray.push(sex[key])
      };

      //increment count of female and male based on sex array
      for (let i=0; i<sexArray.length; i+=1) {
        if (sexArray[i] == "female") {
          female += 1
        } else {
          male += 1
        }
      };

      const chartData = {
        labels: ["Female", "Male"],
        series: [[female, male]], 
      };
      chart.update(chartData);
    })
    .catch(err => console.error(err));
};

// Updating the chart data
function updateChart() {
  let queryString;

  // Get both input fields from the time frame section
  const ageIntervals = document.querySelectorAll(".control-age > input");

  // Grab all age ranges
  for (let i = 0, length = ageIntervals.length; i < length; i += 1) {
    time = ageIntervals[i].value;
    // Start or add to the query string
    if (typeof queryString === "undefined") {
      queryString = "?n=" + time;
    } else {
      queryString += "&n=" + time;
    }
  };
  getChartData(queryString);
};

getChartData();
