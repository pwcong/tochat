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
	type: BIND_UID,
	payload: {
		uid
	}
}
```

## SEND_MSG_TO_ROOM
```
{
	type: SEND_MSG_TO_ROOM,
	payload: {
		from: uid,
		to: room,
		msg
	}
}
```

## RECEIVE_MSG_FROM_ROOM
```
{
	type: RECEIVE_MSG_FROM_ROOM,
	payload: {
		from: uid,
		msg
	}
}
```

## SEND_MSG_TO_USER
```
{
	type: SEND_MSG_TO_USER,
	payload: {
		from: uid,
		to: uid,
		msg
	}
}
```

## RECEIVE_MSG_FROM_USER
```
{
	type: RECEIVE_MSG_FROM_USER,
	payload: {
		from: uid,
		msg
	}
}
```

## JOIN_ROOM
```
{
	type: JOIN_ROOM,
	payload: {
		uid
	}
}
```

## JOIN_ROOM_RESPONSE
```
{
	type: JOIN_ROOM_RESPONSE,
	payload: {
		status: 200|400
	}
}
```

## LEAVE_ROOM
```
{
	type: JOIN_ROOM_RESPONSE,
	payload: {
		uid
	}
}
```