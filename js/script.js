let monthIndex = 0;

const colors = [
	"var(--chrome)",
	"var(--ie)",
	"var(--firefox)",
	"var(--safari)",
	"var(--opera)",
	"var(--android)",
];

const svg = d3.select("svg");
svg.attr("width", 640).attr("height", 640);

const pieGroup = svg.append("g").attr("transform", "translate(320, 320)");

const monthLabel = d3.select("div.month");

function updateGraph() {
	const month = new Date(2009, monthIndex, 1);
	const monthFormat = d3.timeFormat("%b %Y");
	monthLabel.text(monthFormat(month));

	const pieGenerator = d3.pie().sort(null);

	const arcData = pieGenerator(data[monthIndex]);
	const arcGenerator = d3.arc().innerRadius(200).outerRadius(300);

	const paths = pieGroup.selectAll("path").data(arcData);

	// for new paths
	paths
		.enter()
		.append("path")
		//   d is for description
		.attr("d", arcGenerator)
		.style("fill", (d, i) => {
			return colors[i];
		})
		//   transition
		.each(function (d, i) {
			this.savedValue = d;
		});

	//   for existing paths
	paths
		.transition()
		.duration(500)
		.ease(d3.easeLinear)
		.attrTween("d", function (d, i) {
			const startValue = this.savedValue;
			const endValue = d;
			const curve = d3.interpolate(startValue, endValue);

			this.savedValue = d;

			return function (t) {
				return arcGenerator(curve(t));
			};
		});
}

let loop = null;

function startLoop() {
	monthIndex = 0;
	updateGraph();

	clearInterval(loop);
	loop = setInterval(() => {
		monthIndex += 1;

		if (monthIndex >= data.length) {
			clearInterval(loop);
		} else {
			updateGraph();
		}
	}, 500);
}

startLoop();

document.querySelector("a.restart").addEventListener("click", () => {
	startLoop();
});
