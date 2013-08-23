%	setdefault('__app_name__', 'CARAX')
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>{{__app_name__}}—Your best friend, SQLite user!</title>
</head>
<body id="body">
	<h1 id="gina"><a href="/">{{__app_name__}}</a></h1>
	<form action="execute" method="post" accept-charset="utf-8">
		<p>DB file path: <input type="text" name="db_path" value="{{get('db_path', '')}}" id="db_path" size=50></p>
		<p><textarea name="query" rows="8" cols="40"></textarea></p>
		<p><input type="submit" value="Continue &rarr;"></p>
	</form>
<p>
	Query: {{get('query', 'No Query')}}
</p>
<p>Results:<br>
%if defined('rows'):
<table border="1" cellspacing="5" cellpadding="5">
	<tr>
		<th> </th>
		%for col in description:
		<th>{{col[0]}}</th>
		%end
	</tr>
	%for i, row in enumerate(rows):
	<tr>
		<td>{{i+1}}</td>
		%for col in row:
		<td>{{col}}</td>
		%end
	</tr>
	%end
</table>
%end
</p>
</body>
</html>