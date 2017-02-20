# TYPE

* BIND_UID 
* SEND_MSG_TO_ROOM | RECEIVE_MSG_FROM_ROOM 
* SEND_MSG_TO_USER | RECEIVE_MSG_FROM_USER 
* JOIN_ROOM | JOIN_ROOM_RESPONSE 
* LEAVE_ROOM

# DETAIL

## BIND_UID
```
{
	dateTime,
	payload: {
		uid
	}
}
```

## SEND_MSG_TO_ROOM
```
{
	dateTime,
	payload: {
		from: {
			uid,
			avatar
		},
		to: room,
		msg
	}
}
```

## RECEIVE_MSG_FROM_ROOM
```
{
	dateTime,
	payload: {
		from: {
			uid,
			avatar
		},
		msg
	}
}
```

## SEND_MSG_TO_USER
```
{
	dateTime,
	payload: {
		from: {
			uid,
			avatar
		},
		to: uid,
		msg
	}
}
```

## RECEIVE_MSG_FROM_USER
```
{
	dateTime,
	payload: {
		from: {
			uid,
			avatar
		},
		msg
	}
}
```

## JOIN_ROOM
```
{
	dateTime,
	payload: {
		uid,
		name
	}
}
```

## JOIN_ROOM_BROADCAST
```
{
	dateTime,
	payload: {
		uid
	}
}
```

## JOIN_ROOM_RESPONSE
```
{
	dateTime
	payload: {
		name,
		status: 200|400
	}
}
```

## LEAVE_ROOM
```
{
	dateTime
	payload: {
		name,
		uid
	}
}
```

## LEAVE_ROOM_BROADCAST
```
{
	dateTime
	payload: {
		uid
	}
}
```