let selected_device = 'desktop';
let selected_metric = 'lcp';
let timeseries;
let valuess;
let myChart; // Move the myChart declaration here
let metricV;
let deviceV;
fetchDataDevice();
fetchDataMetric();
function getSelectedValueMetric(selectedMetric) {
    // console.log("Selected Metric: " + selectedMetric);
    selected_metric = selectedMetric;
    fetchDataMetric();
}

function getSelectedValueDevice(selectedDevice) {
    // console.log("Selected Device: " + selectedDevice);
    selected_device = selectedDevice;
    fetchDataDevice();
}

function fetchDataMetric() {
    if (selected_metric !== undefined && selected_device !== undefined) {
        const apiUrl = `https://example-metrics.speedvitals.workers.dev/?metric=${selected_metric}&device=${selected_device}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                timeseries = data['timeseries'];
                valuess = data['values'];
                
                setValues();
                pllotingGraph(); // Call pllotingGraph after fetching data
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
}

function fetchDataDevice() {
    if (selected_metric !== undefined && selected_device !== undefined) {
        const apiUrl = `https://example-metrics.speedvitals.workers.dev/?metric=${selected_metric}&device=${selected_device}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                timeseries = data['timeseries'];
                valuess = data['values'];
                
                setValues()
                pllotingGraph(); // Call pllotingGraph after fetching data
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }
}

function pllotingGraph() {
    myChart = echarts.init(document.getElementById('chart-container')); // Initialize myChart here
    var titleText;
    if(selected_metric==='cls'){
        titleText='Cumulative Layout Shift';
    }
    else if(selected_metric==='lcp'){
        titleText='Largest Contentful Paint';
    }
    var option = {
        title: {
            text: titleText
        },
        tooltip: {},
        xAxis: {
            data: timeseries // Use timeseries data here
        },
        yAxis: {},
        series: [{
            name: 'Example Data',
            type: 'line',
            data: valuess // Use valuess data here
        }]
    };

    myChart.setOption(option);
}
function setValues(){
      metricV=document.getElementById('MetricValue');
      deviceV=document.getElementById('DeviceValue');
      var metrictext;
      var devicetext;
      if(selected_metric==='lcp'){
         metrictext='Largest Contentful Paint';
      }
      else if(selected_metric==='cls'){
        metrictext='Cumulative Layout Shift';
      } 
      if(selected_device==='mobile'){
        devicetext='Mobile';
      }
      else if(selected_device==='desktop'){
        devicetext='Desktop';
      }
      metricV.innerHTML=`Metric: ${metrictext}`;
      deviceV.innerHTML=`Device: ${devicetext}`;
}
