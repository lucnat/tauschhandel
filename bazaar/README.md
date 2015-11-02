# Roadmap
## V0.5
 - All discussions published
 - Desktop UI bootstrap
 - phone UI
 - notifications

## V0.6
 - spam detection
 - image upload

## V0.7
 - Desktop UI
 - Search by text, tag
 - messages
 - post edit

# Datenbanken
	- Users
	- Posts
	- PostDiscussions
	- Messages
	- AdminShizzle

### Users
	- _id
	- emails
		- address
		- verified
	- profile
		- watchlist
		- terms
	- username

### Posts
	- _id 
	- title 
	- text
	- istAngebot
	- bild
	- tags
	- userID
	- userName
	- createdAt
	- viewCount
	- interessenten
	- vergebenAn

### PostDiscussions
	- _id
	- postID
	- question
	- answer
	- questioner 
	- published
	- changed at

### Notifications
	- _id
	- type (interesseGemeldet, itemGewonnen, itemVerloren, frageGestellt, frageBeantwortet)
	- triggerer
	- receiver
	- message
	- link
	- createdAt
	- readAt

### Messages
	- _id
	- subject
	- text
	- absender
	- empfaenger
	- sentAt
	- readAt


### AdminShizzle
	- 
