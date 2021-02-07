pragma solidity ^0.5.0;
contract Marketplace{
    string public name;
    mapping(uint=>Product) public products;
    uint public productCount=0;
    constructor() public{
        name="Electronics Marketplace";
    }

    //A structure to store details of the product

    struct Product{
        uint Product_id;
        string Product_name;
        uint price;
        address payable owner;
        bool purchased;
    }
     event ProductPurchased(uint id, string name,uint price,address payable owner,bool purchased);
    //mapping from product id to product details
       event ProductCreated(uint id, string name,uint price,address payable owner,bool purchased);
   

    

    //function to build a new product

    function Create_Product(string memory _name, uint _price )public{
        require(bytes(_name).length>0);
        require(_price>0);
        productCount++;
        products[productCount]= Product(productCount,_name,_price,msg.sender,false);
        emit ProductCreated(productCount,_name,_price,msg.sender,false);


    }
 

    function Purchase_Product(uint _id) public payable{
        Product memory _product = products[_id] ;
        address payable _seller = _product.owner;
        // Make sure the product has a valid id
        require( _product.Product_id > 0 && _product.Product_id <= productCount);
        require(msg.value>=_product.price);
        require(!_product.purchased);
        require(_seller!=msg.sender);
        //steps to change the ownership of the product
        _product.owner=msg.sender;
        _product.purchased=true;
        products[_id]= _product;
        //transfering the money to the seller
        address(_seller).transfer(msg.value);

        emit ProductPurchased(productCount, _product.Product_name, _product.price, msg.sender, true);
    }

   
}