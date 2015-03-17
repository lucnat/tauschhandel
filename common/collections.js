Posts			= new Mongo.Collection ('posts');
Messages		= new Mongo.Collection ('messages');
Tags			= new Mongo.Collection ('tags');
AdminShizzle	= new Mongo.Collection ('adminshizzle');


tags = [
	{tag: 'Bücher', 					count: 0},
	{tag: 'Möbel', 						count: 0},
	{tag: 'Unterhaltungselektronik', 	count: 0},
	{tag: 'Telefon/Mobile', 			count: 0},
	{tag: 'Haushaltsgeräte', 			count: 0},
];

/*

FIXTURES: 

tags.forEach(function(tag){	Tags.insert(tag);   });

*/