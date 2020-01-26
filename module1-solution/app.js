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
                else if (dishes.length <= 3) { //lunchDishes has less than or equal to 3 items
                    $scope.lunchMessage = "Enjoy!";
                    $scope.messageStyle = "success";
                }
                else { //lunchDishes has more than 3 items
                    $scope.lunchMessage = "Too much!";
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