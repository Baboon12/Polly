const form = document.getElementById('vote_form');

form.addEventListener('submit', e =>{
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice };

    fetch("http://localhost:3000/poll", {
        method: 'post',
        body: JSON.stringify(data), // to convert data into a JSON string
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }) // when this fucntion is executed it retuns a res.json and data. if there is an error it will return an error
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error)); 
    
    // to prevent the default behaviour of form on submitting
    e.preventDefault();

    // to increment the count 
    location.reload();
});

fetch('http://localhost:3000/poll').then(res => res.json()).then(data => {
    const votes = data.votes;
    const total_votes = votes.length;
    // count vote points
    const voteCounts = votes.reduce((acc, vote) => ((acc[vote.os]=(acc[vote.os]||0)+ parseInt(vote.points)), acc), {});

    let dataPoints = [
        {label: 'Windows', y: voteCounts.Windows},
        {label: 'MacOS', y: voteCounts.MacOS},
        {label: 'Linux', y: voteCounts.Linux},
        {label: 'Other', y: voteCounts.Other},
    ];
    
    const chart_container = document.querySelector('#chart_container');
    if (chart_container){
        const chart = new CanvasJS.Chart('chart_container', { 
            animationEnabled: true, 
            theme: 'theme1',
            backgroundColor: "#313131",
            title: {
                text: `Total Vote: ${total_votes}`,
                fontColor: "#ffffff"
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
    
        chart.render();
    
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('335ac32498d85fd8cc1b', {
          cluster: 'ap2'
        });
    
        var channel = pusher.subscribe('os-poll');
        channel.bind('os-vote', function(data) {
          dataPoints = dataPoints.map(i => {
              if(i.label == data.os){
                  i.y += data.points;
                  return i;
              }
              else {
                  return i;
              }
          })
          chart.render(); 
        });
    }
});


