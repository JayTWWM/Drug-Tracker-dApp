pragma solidity >=0.4.21 <0.7.0;
import './AssetLibrary.sol';
import './IdentityLibrary.sol';

contract AssetTracker {
    
    mapping(uint => AssetLibrary.Asset) public AssetStore;
    uint256 public assetCount= 0;
    
    function createAsset(
        string memory _batchNo,
        string memory _name,
        string memory _description,
        string memory _manufacturer,
        string memory _owner,
        string memory  _quantity,
        string memory _status
        ) public returns(uint256) {
        assetCount++;
        AssetStore[assetCount]= AssetLibrary.Asset(assetCount, _batchNo, _name, _description, _manufacturer, 0, _quantity);
        AssetStore[assetCount].statusCount++; 
        AssetStore[assetCount].status[AssetStore[assetCount].statusCount]=AssetLibrary.Status(block.timestamp, _status, _owner);
        emit AssetCreate(assetCount, _manufacturer, _status);
    }
    function getAsset(uint _id) view public returns(string memory, string memory, string memory, string memory, string memory, string memory,string memory) {
        return (AssetStore[_id].batchNo, AssetStore[_id].name, AssetStore[_id].manufacturer, AssetStore[_id].status[AssetStore[_id].statusCount].owner, AssetStore[_id].status[AssetStore[_id].statusCount].status, AssetStore[_id].description, AssetStore[_id].quantity);
    }
    function transferAsset(uint _id, string memory _newOwner, string memory _status, string memory _quantity, string memory _oldOwner) public returns(string memory) {
        require(keccak256(abi.encodePacked((AssetStore[_id].quantity))) == keccak256(abi.encodePacked((_quantity))));
        require(keccak256(abi.encodePacked((AssetStore[_id].status[AssetStore[_id].statusCount].owner))) == keccak256(abi.encodePacked((_oldOwner))));
        AssetStore[_id].statusCount++;
        AssetStore[_id].status[AssetStore[_id].statusCount]=AssetLibrary.Status(block.timestamp, _status, _newOwner);
        emit AssetTransfer(_id, _newOwner,_quantity);
    }

    function getAssetCount() view public returns(uint) {
        return assetCount;
    }

    function getStatus(uint _id, uint _statusCount) view public returns(uint, string memory, string memory) {
        AssetLibrary.Status memory s= AssetStore[_id].status[_statusCount];
        return (s.time, s.status, s.owner);
    }

    event AssetCreate(uint id, string manufacturer, string status);
    event AssetTransfer(uint id, string newOwner, string quantity);

    mapping(uint => IdentityLibrary.Identity) public IdentityStore;
    uint256 public identityCount= 0;
    
    function createIdentity(
        string memory _addresser,
        string memory _name,
        string memory _phone,
        string memory _email,
        string memory _password
        ) public returns(uint256) {
        identityCount++;
        IdentityStore[identityCount]= IdentityLibrary.Identity(identityCount, _addresser, _name, _phone, _email, _password);
        emit IdentityCreate(identityCount, _addresser, _name);
    }
    function getIdentity(uint _id,string memory _addresser) view public returns(string memory, string memory, string memory, string memory, string memory) {
        require(keccak256(abi.encodePacked((IdentityStore[_id].addresser))) == keccak256(abi.encodePacked((_addresser))));
        return (IdentityStore[_id].addresser, IdentityStore[_id].name, IdentityStore[_id].phone, IdentityStore[_id].email, IdentityStore[_id].password);
    }

    function getidentityCount() view public returns(uint) {
        return identityCount;
    }

    event IdentityCreate(uint id, string manufacturer, string status);


}