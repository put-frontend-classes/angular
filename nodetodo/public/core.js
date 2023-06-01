var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.todos = [];

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

  $scope.onTodoBlur = function(id) {
    console.log(id);
  }

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function() {
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function(id) {
    var newTodo = $scope.todos.find(el => el._id === id);
    $http({
          url: "/api/todos",
          method: "PATCH",
          headers:{'Content-Type':'application/json', 'Accept':'application/json'},
          data: newTodo
        })
        .success(function(data) {
        })
        .error(function(data) {
          console.log("Error: " + data);
        });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function(id) {
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}
