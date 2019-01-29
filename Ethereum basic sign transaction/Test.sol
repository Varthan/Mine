pragma solidity >=0.4.22 <0.6.0;
contract test {
    uint256 temp;
    
    function update(uint256 a) public payable
    {
        temp = a;
    }
    
    function clear() public payable
    {
        temp = 0;
    }
    
    function show() public view returns(uint256)
    {
        return temp;
    }   
}