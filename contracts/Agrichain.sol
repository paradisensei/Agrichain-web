pragma solidity ^0.4.18;

/* @title Smart contract for storing information about organic products */
contract Agrichain {

    /*
        @param image     - hash of image in IPFS
        @param latitude  - coordinate 1 (base and dec parts)
        @param longitude - coordinate 2 (base and dec parts)
        @param price     - price set for the product
        @param timestamp - the exact time of product submission
    */
    struct Product {
        string title;
        string image;
        uint latitudeBase;
        uint latitudeDec;
        uint longitudeBase;
        uint longitudeDec;
        uint price;
        uint quantity;
        uint timestamp;
    }

    // farmer's address -> products produced by him/her
    mapping (address => Product[]) public products;

    // a dynamically-sized array of all farmer's addresses
    address[] public farmers;

    function getFarmers() public constant returns (address[]) {
        return farmers;
    }

    function getProductsCount(
        address farmer
    )
        public
        constant
        returns (uint)
    {
        return products[farmer].length;
    }

    function newProduct(
        string title,
        string image,
        uint latitudeBase, uint latitudeDec,
        uint longitudeBase, uint longitudeDec,
        uint price,
        uint quantity
    )
        public
    {
        // add farmer's address if new
        addFarmer(msg.sender);
        Product memory product = Product({
            title: title,
            image: image,
            latitudeBase: latitudeBase, latitudeDec: latitudeDec,
            longitudeBase: longitudeBase, longitudeDec: longitudeDec,
            price: price,
            quantity: quantity,
            timestamp: now
        });
        products[msg.sender].push(product);
    }

    function addFarmer(address farmer) private {
        // check whether there is already a farmer with such address
        bool duplicate = false;
        for (uint i = 0; i < farmers.length; i++) {
            if (farmers[i] == farmer) {
                duplicate = true;
            }
        }

        // if new farmer, save his/her address
        if (!duplicate) {
            farmers.push(farmer);
        }
    }

}
