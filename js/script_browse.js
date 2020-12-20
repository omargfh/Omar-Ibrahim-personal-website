document.addEventListener("DOMContentLoaded", function (event) {

	var all_objects = document.getElementsByClassName("items");

	function hide_all_objects() {
		document.getElementById("all").classList.remove("active-element");
		for (i=0;i<all_objects.length;i++) {
			all_objects[i].classList.add("display-none");
			all_objects[i].classList.remove("show-object");
		}
	}

	function toggle_objects(selected_object) {
		selected_object.classList.remove("display-none");
		selected_object.classList.add("show-object");
	}


	document.getElementById("singer").addEventListener("click", function() {
		hide_all_objects();
		var singer = document.getElementsByClassName("singer");
		for (i=0;i<singer.length;i++) {
			toggle_objects(singer[i]);
		}
	});

	document.getElementById("actor").addEventListener("click", function() {
		hide_all_objects();
		var actor = document.getElementsByClassName("actor");
		for (i=0;i<actor.length;i++) {
			toggle_objects(actor[i]);
		}
	});

	document.getElementById("rapper").addEventListener("click", function() {
		hide_all_objects();
		var rapper = document.getElementsByClassName("rapper");
		for (i=0;i<rapper.length;i++) {
			toggle_objects(rapper[i]);
		}
	});

	document.getElementById("all").addEventListener("click", function() {
		hide_all_objects();
		var all = document.getElementsByClassName("items");
		for (i=0;i<all.length;i++) {
			toggle_objects(all[i]);
		}
	});


})

