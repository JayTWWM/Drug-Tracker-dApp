
pragma solidity >=0.4.21 <0.7.0;

library IdentityLibrary {
    struct Identity {
        uint count;
        string addresser;
        string name;
        string phone;
        string email;
        string password;
    }
}