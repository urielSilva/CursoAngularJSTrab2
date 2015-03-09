/**
 * Created by Uriel on 08/03/2015.
 */
angular.module('enejApp')

    .factory("Room", function RoomFactory($resource) {
        return $resource("https://burning-fire-6305.firebaseio.com/rooms.json",{},{});
    });