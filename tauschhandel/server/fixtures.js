var tags = [
	{tag: 'Bücher', 					count: 0},
	{tag: 'Möbel', 						count: 0},
	{tag: 'Unterhaltungselektronik', 	count: 0},
	{tag: 'Telefon/Mobile', 			count: 0},
	{tag: 'Haushaltsgeräte', 			count: 0},
];

if(Tags.find().count() === 0){
	tags.forEach(function(tag){
		Tags.insert(tag);
	});
}
