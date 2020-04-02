// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  const patty = $("#patty");
  $("button").on("click", function(event) {
    let id = $(this).data("id");
    if (this.id === "add") {
      return;
    }
    let devour = {
      devoured: true
    };

    // Send the PUT request.
    $.ajax("/api/devour/" + id, {
      type: "PUT",
      data: devour
    }).then(function() {
      console.log("yumm just ate a patty!");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    let val = patty.val();
    console.log(val);
    if (val === "") {
      return;
    }
    let burger = {
      meal: val
    };
    console.log(JSON.stringify(burger));
    // Send the POST request.
    $.ajax("/api/eat", {
      type: "POST",
      data: burger
    }).then(function() {
      console.log("created burger");
      patty.val("");
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
