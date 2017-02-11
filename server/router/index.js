
var router = module.exports = require('koa-router')();

router
	.get('/', function *(){

	});


function renderFullPage(html, initialState) {
  return `
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>ToChat</title>
		<style>
			body {
				background: #fff url(/image/bg.jpg) no-repeat left top;
	  			background-size: cover;
			}
		</style>
	</head>
	<body>

		${html}
		<script src="/js/bundle.js"></script>

	</body>
	</html>
  `;
}