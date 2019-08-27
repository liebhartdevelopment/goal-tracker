const URL = "http://localhost:3000";

function getGoals() {
  $.get(`${URL}/goals`, data => {
    viewModel.goals(data);
  });
}

function ViewModel() {
  let self = this;
  self.goals = ko.observableArray();
  self.goalInputName = ko.observable();
  self.goalInputType = ko.observable();
  self.goalInputDeadline = ko.observable();

  self.addGoal = function() {
    var name = $("#name").val();
    var type = $("#type").val();
    var deadline = $("#deadline").val();

    self.goals.push({
      name,
      type,
      deadline
    });

    $.ajax({
      url: `${URL}/goals`,
      data: JSON.stringify({
        name: name,
        type: type,
        deadline: deadline
      }),
      type: "POST",
      contentType: "application/json",
      success: function(data) {
        console.log("Goal Added...");
      },
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  };

  self.types = ko.observableArray([
    "Healthy & Fitness",
    "Professional",
    "Relationships",
    "Self Help"
  ]);
}

let viewModel = new ViewModel();

ko.applyBindings(viewModel);
