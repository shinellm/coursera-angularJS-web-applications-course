(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

        LunchCheckController.$inject = ['$scope'];
        
        function LunchCheckController($scope) {
            $scope.lunchDishes = "";
            $scope.lunchMessage = "";
            $scope.messageStyle = "";

            $scope.checkLunchDishes = function() {
                // Empty items (i.e. ' , ') are not counted towards the total count
                const dishes = removeEmptyItems($scope.lunchDishes.split(','));

                if (dishes.length === 0) { //lunchDishes is empty
                    $scope.lunchMessage = "Please enter data first";
                    $scope.messageStyle = "failure";
                }
                else { //set lunchMessage depending on if lunchDishes is more than 3 items or less-than/equal to 3 items
                    $scope.lunchMessage = (dishes.length <= 3) ? "Enjoy!" : "Too much!";
                    $scope.messageStyle = "success";
                }
            };

            function removeEmptyItems(items) {
                return items.reduce(function (accumulator, currentValue) {
                    if (currentValue.trim() !== "") { //Remove whitespace from both sides of currentValue and check if empty
                        accumulator.push(currentValue.trim());
                    }
                    return accumulator;
                }, []);
            }
        }
    }
)();