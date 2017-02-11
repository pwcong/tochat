module.exports = ctx => {
	ctx.body = render();
}

function render() {
  return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>ToChat</title>
	</head>
	<body>

		<div id="app"></div>
		<script src="/js/bundle.js"></script>

	</body>
	</html>
  `;
}