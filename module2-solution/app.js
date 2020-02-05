(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider);

    // List #1 - Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var list1 = this;

        list1.items = ShoppingListCheckOffService.getItemsToBuy();

        list1.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    };

    // List #2 - Controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var list2 = this;

        list2.items = ShoppingListCheckOffService.getItemsAlreadyBought();
    };

    // Service - To be used by List #1 & #2
    function ShoppingListCheckOffService(maxItems) {
        var service = this;

        var buyItems = [
            { name: "cookies", quantity: 10 },
            { name: "pizza", quantity: 2 },
            { name: "chips", quantity: 4 },
            { name: "soda", quantity: 3 },
            { name: "cake", quantity: 1 }
        ];

        var boughtItems = [];

        service.buyItem = function(itemIndex) {
            if (!maxItems || maxItems && (boughtItems.length < maxItems)) {
                var purchased = buyItems.splice(itemIndex, 1);
                var item = {
                    name: purchased[0].name,
                    quantity: purchased[0].quantity
                };
                boughtItems.push(item);
            }
        };

        service.getItemsToBuy = function() {
            return buyItems;
        };

        service.getItemsAlreadyBought = function() {
            return boughtItems;
        };
    };

    // Service Provider - Creates and returns the new service
    function ShoppingListCheckOffServiceProvider() {
        var provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function () {
            return new ShoppingListCheckOffService(provider.defaults.maxItems);
        }
    };
})();