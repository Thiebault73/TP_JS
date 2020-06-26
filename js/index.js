

const ctx = document.getElementById("chartFra");

function sumNewCases(cases) {
	var sum = [];
	var reducer = (accumulator, currentValue) => accumulator + currentValue;
	for(let news in cases) {
		sum.push(cases[news].reduce(reducer));
	}
	return sum;
}

function graphTotalCases(cases) {
	var tabCases = [];
	for(let data in cases) {
		tabCases.push(cases[data][cases[data].length-1]);
	}	
	
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
	        datasets: [{
	            label: 'Nombre total de cas COVID-19 en France par mois',
	            data: [tabCases[0], tabCases[1], tabCases[2], tabCases[3], tabCases[4], tabCases[5]],
	            backgroundColor: [
	                'rgba(255, 99, 132, 0.2)',
	                
	            ],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	               
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

function graphNewCases(cases) {
	
	var myChart = new Chart(ctx, {
		type: 'line',
	    data: {
	        labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
	        datasets: [{
	            label: 'Nombre de nouveaux cas COVID-19 en France par mois',
	            data: [cases[0], cases[1], cases[2], cases[3], cases[4], cases[5]],
	            backgroundColor: [
	                
                'rgba(153, 102, 255, 0.2)'
                //'rgba(255, 159, 64, 0.2)'
	                
	            ],
	            borderColor: [
	             
                'rgba(153, 102, 255, 1)'
                //'rgba(255, 159, 64, 1)'
	               
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});		
}

function graphTotalDeath(death) {
	var tabDeath = [];
	for(let data in death) {
		tabDeath.push(death[data][death[data].length-1]);
	}	
	
	var myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
	        datasets: [{
	            label: 'Nombre total de décès liés au COVID-19 en France par mois',
	            data: [tabDeath[0], tabDeath[1], tabDeath[2], tabDeath[3], tabDeath[4], tabDeath[5]],
	            backgroundColor: [
              
	                'rgba(75, 192, 192, 0.2)'
	             
	            ],
	            borderColor: [
	           
                	'rgba(75, 192, 192, 1)'
	               
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}

function graphNewDeath(death) {
	var myChart = new Chart(ctx, {
		type: 'line',
	    data: {
	        labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
	        datasets: [{
	            label: 'Nombre de nouveaux décès liés au COVID-19 en France par mois',
	            data: [death[0], death[1], death[2], death[3], death[4], death[5]],
	            backgroundColor: [
	                'rgba(55, 55, 55, 0.2)',
	                
	            ],
	            borderColor: [
	                'rgba(55, 55, 55, 1)',
	               
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero: true
	                }
	            }]
	        }
	    }
	});
}
	


function display(obj) {
	var graph = obj.value;
	
	if(graph === "newCases") {
		axios.get("/newCases").then(function(response) {

		var newCases = {
			janvier:[],
			fevrier:[],
			mars: [],
			avril: [],
			mai: [],
			juin: []
		};

		
		
		for(let j=1; j < response.data.length; j++) {
			
			if(j < 32){
				newCases.janvier.push(response.data[j]);
			}
			if(j > 31 && j < 61) {
				newCases.fevrier.push(response.data[j]);
			}
			if(j > 60 && j < 92) {
				newCases.mars.push(response.data[j]);
			}
			if(j > 91 && j < 122) {
				newCases.avril.push(response.data[j]);
			}
			if(j > 121 && j < 153) {
				newCases.mai.push(response.data[j]);
			}
			if(j > 152 && j < 181) {
				newCases.juin.push(response.data[j]);
			} 

		}
		var sum = sumNewCases(newCases);
		graphNewCases(sum);
		
	});
	} else if (graph === "totalCases") {
		axios.get("/totalCases").then(function(response) {

		var totalCases = {
			janvier:[],
			fevrier:[],
			mars: [],
			avril: [],
			mai: [],
			juin: []
		};
		
		for(let j=1; j < response.data.length; j++) {
			
			if(j < 32){
				totalCases.janvier.push(response.data[j]);
				
			}
			if(j > 31 && j < 61) {
				totalCases.fevrier.push(response.data[j]);
				
			}
			if(j > 60 && j < 92) {
				totalCases.mars.push(response.data[j]);
			}
			if(j > 91 && j < 122) {
				totalCases.avril.push(response.data[j]);
			}
			if(j > 121 && j < 153) {
				totalCases.mai.push(response.data[j]);
			}
			if(j > 152 && j < 181) {
				totalCases.juin.push(response.data[j]);
			} 

		}
		graphTotalCases(totalCases);
	});

	} else if (graph === "totalDeath") {
		axios.get("/totalDeath").then(function(response) {
			var totalDeath = {
				janvier:[],
				fevrier:[],
				mars: [],
				avril: [],
				mai: [],
				juin: []
			};

			for(let j=1; j < response.data.length; j++) {
				if(j < 32){
				totalDeath.janvier.push(response.data[j]);
				
				}
				if(j > 31 && j < 61) {
					totalDeath.fevrier.push(response.data[j]);
					
				}
				if(j > 60 && j < 92) {
					totalDeath.mars.push(response.data[j]);
				}
				if(j > 91 && j < 122) {
					totalDeath.avril.push(response.data[j]);
				}
				if(j > 121 && j < 153) {
					totalDeath.mai.push(response.data[j]);
				}
				if(j > 152 && j < 181) {
					totalDeath.juin.push(response.data[j]);
				} 
			}

			graphTotalDeath(totalDeath);


		});
		
	} else if (graph === "newDeath") {
		axios.get("/newDeath").then(function(response) {
			var newDeath = {
				janvier:[],
				fevrier:[],
				mars: [],
				avril: [],
				mai: [],
				juin: []
			}
			for(let j=1; j < response.data.length; j++) {
				if(j < 32){
					newDeath.janvier.push(response.data[j]);
				
				}
				if(j > 31 && j < 61) {
					newDeath.fevrier.push(response.data[j]);
					
				}
				if(j > 60 && j < 92) {
					newDeath.mars.push(response.data[j]);
				}
				if(j > 91 && j < 122) {
					newDeath.avril.push(response.data[j]);
				}
				if(j > 121 && j < 153) {
					newDeath.mai.push(response.data[j]);
				}
				if(j > 152 && j < 181) {
					newDeath.juin.push(response.data[j]);
				} 
			}
			var sum = sumNewCases(newDeath);
			graphNewDeath(sum);
		});
	}
	

		
	

}
	
	

