// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.7.0;
pragma experimental ABIEncoderV2;

contract  RoadToll {
    
    struct Date {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    
    mapping(string => Date) public expDate;
    
    function isLeapYear(uint16 _year) public pure returns (bool) {
        if (_year % 4 != 0) {
            return false;
        }
        if (_year % 100 != 0) {
            return true;
        }
        if (_year % 400 != 0) {
            return false;
        }
        return true;
    }
    
    function monthDays(uint8 month, uint16 year) public pure returns (uint8) {
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                return 31;
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
                return 30;
        }
        else if (isLeapYear(year)) {
                return 29;
        }
        else {
                return 28;
        }
    }
    
    function addDays(Date memory date, uint8 _days) public pure returns (Date memory){
        uint8 mthDays = monthDays(date.month, date.year);
        if (mthDays >= date.day + _days){
            date.day += _days;
            return date;
        }
        
        _days = _days + date.day - mthDays;
        date.month ++;
        if (date.month == 13){
            date.month = 1;
            date.year ++;
        }
        
        mthDays = monthDays(date.month, date.year);
        
        while (_days > mthDays){
            _days -= mthDays;
            date.month ++;
            if (date.month == 13){
                date.month = 1;
                date.year ++;
            }
            mthDays = monthDays(date.month, date.year);
        }
        date.day = _days;
        return date;
    }
    

    function payToll(string memory _plate,uint16 _year ,uint8 _month ,uint8 _day) public payable{
        Date memory date;
        date.year = _year;
        date.month = _month; 
        date.day = _day;
        
        bool alreadyPayed = false;

        if(msg.value >= 0.003 ether && msg.value < 0.007 ether)
            date = addDays(date, 7);
            
        if(msg.value >= 0.007 ether && msg.value < 0.012 ether)
            date = addDays(date, 30);
            
        if(msg.value >= 0.012 ether && msg.value < 0.027 ether)
            date = addDays(date, 182);
        
        if(msg.value >= 0.027 ether){
            if(date.month == 2 && date.day == 29 && isLeapYear(date.year)){
                date.day = 28;
            }
            date.year ++;
        }
        if(expDate[_plate].year > date.year){
            alreadyPayed = true;
        } else if (expDate[_plate].month > date.month && expDate[_plate].year == date.year){
                alreadyPayed = true;
            } else if (expDate[_plate].day > date.day && expDate[_plate].year == date.year && expDate[_plate].month == date.month){
                alreadyPayed = true;
            }
        if(!alreadyPayed || expDate[_plate].year == 0)
            expDate[_plate] = date;
    }
    
    function checkToll(string memory _plate) public view returns(Date memory){
        return expDate[_plate];
    }
}