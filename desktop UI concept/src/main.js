var Engine 			= famous.core.Engine;
var Surface 		= famous.core.Surface;
var ImageSurface 	= famous.surfaces.ImageSurface;
var Modifier 		= famous.core.Modifier;
var mainContext 	= Engine.createContext();

var bg = new ImageSurface({
  size: [undefined, undefined],
})

bg.setContent('http://cdn.shopify.com/s/files/1/0241/9661/products/ParquetWhiteWood_web.jpg?v=1389726128')


var bgmod = new Modifier({
	origin: [0.5,0.5],
	align: [0.5,0.5]
});

var postitmod = new Modifier({
	origin: [0.5,0.5],
	align: [0.5,0.5]
});




for(var i=0; i<3; i++){
	var x = Math.random();
	var y = Math.random();
	var bgmod = new Modifier({ origin: [x,y], align: [x,y] });
	var postitmod = new Modifier({ origin: [x,y], align: [x,y] });

	var postitbg = new ImageSurface({
	  size: [300,300]
	});
	postitbg.setContent('http://upload.wikimedia.org/wikipedia/commons/e/e5/Post-it-note-transparent.png')

	var postitText = new Surface({
	  content: "<h3> Geile Mixer </h3> <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna  nostrud exercitation ullamco laboris nisi </p>",
	  size: [300,300],
	  properties: {
	  	color: '#333',
	    textAlign: 'center',
	    padding: '25px 35px 35px 25px',
	  }

	});

	mainContext.add(bgmod).add(postitbg);
	mainContext.add(postitmod).add(postitText);

}




mainContext.add(bg);
mainContext.add(bgmod).add(postitbg);
mainContext.add(postitmod).add(postitText);
