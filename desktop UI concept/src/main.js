var Engine 			= famous.core.Engine;
var Surface 		= famous.core.Surface;
var ImageSurface 	= famous.surfaces.ImageSurface;
var Modifier 		= famous.core.Modifier;
var Transform 		= famous.core.Transform;
var mainContext 	= Engine.createContext();


// Background
var bg = new ImageSurface({
  size: [undefined, undefined],
})

bg.setContent('http://img.gawkerassets.com/img/17lm97guuqu9zpng/original.png');

mainContext.add(bg);


// Topbar
var topbar = new Surface({
	size: [undefined, 50],
	properties: {
		borderBottom: '1px solid white',
	}
});


// Buttons: Surfaces & Modifiers
var homeButton = new Surface({
	size: [true, true],
	content: '<input type="image" src="https://www.hernandocountygis-fl.us/PropertySearch/Images/Home%20Button.png" name="image" width="30" height="30">',
	properties: {
		
	}
});

var homeButtonMod = new Modifier({
		origin: [0, 0.5, 2.5],
		align: [0, 0],
		transform: Transform.translate(15,25,0),
		
});

var profileButton = new Surface({
	size: [true, true],
	content: '<input type="image" src="http://i.imgur.com/TiLqB9T.gif" name="image" width="40" height="40">',
});

var profileButtonMod = new Modifier({
		origin: [0, 0.5, 2.5],
		align: [0, 0],
		transform: Transform.translate(45,25,0),
		
});

var infoButton = new Surface({
	size: [true, true],
	content: '<input type="image" src="http://www.journalism.co.za/wp-content/uploads/2014/08/more_information_icon.jpg" name="image" width="40" height="40">',
});

var infoButtonMod = new Modifier({
		origin: [0, 0.5, 2.5],
		align: [0, 0],
		transform: Transform.translate(75,25,0),
		
});

mainContext.add(topbar);
mainContext.add(homeButtonMod).add(homeButton);
mainContext.add(profileButtonMod).add(profileButton);
mainContext.add(infoButtonMod).add(infoButton);


// Random Post-it Machine
var pos = [];
pos[0] = [Math.random(), Math.random()];

var minRelBreite = 220/914;
var minRelHoehe = 260/885;


for(var i=1; i<7; i++){
	var collided = true;
	var tries = 0;
	while(collided){
		pos[i] = [Math.random(), Math.random()];
		collided = false;
		tries++;


		for(var j=0; j<i; j++){
			if(Math.abs(pos[i][0]-pos[j][0]) < minRelBreite && Math.abs(pos[i][1]-pos[j][1]) < minRelHoehe) {
				console.log('lets try new position');
				collided = true;
			}
		}
	}
}


pos.forEach(function(pos){

	var phi = (Math.random()-0.5)/3;
	var bgmod = new Modifier({ origin: pos, align: pos, transform: Transform.rotateZ(phi)});
	var postitmod = new Modifier({ origin: pos, align: pos, transform: Transform.rotateZ(phi)});

	var postitbg = new ImageSurface({
	  size: [270,270]
	});
	postitbg.setContent('http://upload.wikimedia.org/wikipedia/commons/e/e5/Post-it-note-transparent.png');

	var postitText = new Surface({
	  content: "<h3> Geile Mixer </h3> <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  nostrud  </p>",
	  size: [270,270],
	  properties: {
	  	color: '#333',
	    textAlign: 'center',
	    padding: '20px 40px 50px 30px',
	  }

	});

	mainContext.add(bgmod).add(postitbg);
	mainContext.add(postitmod).add(postitText);


});




