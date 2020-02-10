
pragma solidity >=0.4.21 <0.7.0;

library AssetLibrary {
    struct Asset {
        uint id;
        string batchNo;
        string name;
        string description;
        string manufacturer;
        uint statusCount;
        mapping(uint => Status) status;
        string quantity;
    }
    struct Status {
        uint time;
        string status;
        string owner;
    }
}