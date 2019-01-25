pragma solidity >=0.4.22 <0.6.0;
contract test {
    uint256 temp;
    
    function update(uint256 a) public returns(uint256)
    {
        temp = a;
        return temp;
    }
    
    function clear() public payable returns(uint256)
    {
        temp = 0;
        return temp;
    }
    
    function show() public view returns(uint256)
    {
        return temp;
    }
    
}
