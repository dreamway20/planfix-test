import {TestDrawer} from "./testDrawer";

var drawer = new TestDrawer();
drawer.draw();
drawer.loadData();

	
$(document).on("click",".activField",function(e){
	$("#login").fadeIn(800);
	drawer.loadNotice(e.target.id);
});

$("#login").on("click",".closeBtn",function(){
	$("#login").fadeOut(200,function(){
		drawer.removeNotice();
	});
});

$("#login").on("click",".saveBtn",function(){
	$("#login").fadeOut(200,function(){
		drawer.removeNotice();
	});
});