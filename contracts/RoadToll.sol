pragma solidity ^0.7.0;

contract  RoadToll {
    mapping(string => string) public tollStatus;
    
    function buyToll(string memory _plate) public {
        tollStatus[_plate] = "bought";
    }
    
    function checkToll(string memory _plate) public view returns(string memory){
        if(bytes(tollStatus[_plate]).length == 0){
            return "Nu ai";
        } else{
            return tollStatus[_plate];
        }
    }
}