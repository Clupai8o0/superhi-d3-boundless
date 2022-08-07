let monthIndex = 0;

const svg = d3.select("svg");
svg.attr("width", 640).attr("height", 640);

const pieGroup = svg.append("g");

function updateGraph() {
	pieGroup
		.selectAll("rect")
		.data(data[monthIndex])
		.enter()
		.append("rect")
		.attr("x", (_, i) => i * 100)
		.attr("y", 0)
		.attr("width", 90)
		.attr("height", (d) => d)
		.style("fill", "white");
}

updateGraph();
