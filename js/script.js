let monthIndex = 50;

const colors = [
	"var(--chrome)",
	"var(--ie)",
	"var(--firefox)",
	"var(--opera)",
	"var(--android)",
];

const svg = d3.select("svg");
svg.attr("width", 640).attr("height", 640);

const pieGroup = svg.append("g").attr("transform", "translate(320, 320)");

function updateGraph() {
	const pieGenerator = d3.pie();

	const arcData = pieGenerator(data[monthIndex]);
	const arcGenerator = d3.arc().innerRadius(200).outerRadius(300);

	const paths = pieGroup.selectAll("path").data(arcData);

	paths
		.enter()
		.append("path")
		.attr("d", arcGenerator)
		.style("fill", (_, i) => colors[i]);
}

updateGraph();
