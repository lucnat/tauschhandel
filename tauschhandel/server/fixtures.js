var tags = [
	{tag: 'Möbel', 						count: 0},
	{tag: 'Haushaltsgeräte', 			count: 0},
	{tag: 'Unterhaltungselektronik', 	count: 0},
	{tag: 'Bücher/Musik', 				count: 0},
	{tag: 'Musikinstrumente', 			count: 0},
	{tag: 'Handys', 					count: 0},
	{tag: 'Kunst', 						count: 0},
	{tag: 'Beleuchtung', 				count: 0},
	{tag: 'Garten & Hobby', 			count: 0},
	{tag: 'Sonstiges', 					count: 0}
];


if(Tags.find().count() === 0){
	tags.forEach(function(tag){
		Tags.insert(tag);
	});
}
