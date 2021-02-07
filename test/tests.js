const Marketplace= artifacts.require('./Marketplace.sol')
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Marketplace',([deployer,seller,buyer])=>{
    let marketplace 
    before(async ()=>{
        marketplace=await Marketplace.deployed()
        //waiting more marketplace to be deployed so we can
    
    })

    //testcase to check if the contract has been deployed or not

    describe('deployment',async () =>{
        it("deploys successfuly", async ()=>{
            const address= await marketplace.address
            assert.notEqual(address,0x0)
            assert.notEqual(address,null)
            assert.notEqual(address,"")
            assert.notEqual(address,undefined)
        })

        it('has a name',async ()=>{
            const name= await marketplace.name()
            assert.equal(name,"Electronics Marketplace")
        })
    })

    

    describe("products",async () =>{
        let result, productCount
        before(async ()=>{
            
            result= await marketplace.Create_Product("iphone",web3.utils.toWei('1','Ether'),{from: seller})
            productCount= await marketplace.productCount()
        })

        it('creates products',async () =>{

            assert.equal( productCount , 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(),'id is correct')
            assert.equal(event.name,'iphone','name is correct')
            assert.equal(event.price,'1000000000000000000','price is correct')
            assert.equal(event.owner,seller,'owner is correct')
            assert.equal(event.purchased,false,'purchased is correct')

        })

        it('sells a product',async ()=>{
            result = await marketplace.Purchase_Product(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})
            assert.equal( productCount , 1)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(),'id is correct')
            assert.equal(event.name,'iphone','name is correct')
            assert.equal(event.price,'1000000000000000000','price is correct')
            assert.equal(event.owner,buyer,'owner is correct')
            assert.equal(event.purchased,true,'purchased is correct')

        })

        
    })

   


})