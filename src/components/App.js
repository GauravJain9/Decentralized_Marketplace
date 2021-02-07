import React, { Component } from 'react';
import logo from '../logo.png';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import './App.css';
import Navbar from './Navbar'
import Main from './Main'





class App extends Component {

  async componentWillMount() {
  await this.loadBlockchainData()
}


async loadBlockchainData(){
  const web3= new Web3(Web3.givenProvider ||"http://localhost:9545")
  const accounts = await web3.eth.getAccounts()
  this.setState({account:accounts[0]})
  console.log(this.state.account)
  const networkId = await web3.eth.net.getId()
  console.log(networkId)
  const networkData = Marketplace.networks[networkId]
  if(networkData){
    const marketplace=web3.eth.Contract(Marketplace.abi,networkData.address)
    this.setState({marketplace})
    const productCount=await marketplace.methods.productCount().call()
    for(let i=0;i<productCount;i++)
    {
      const product = await marketplace.methods.products(i).call() 
      this.setState({products:[...this.state.products,product]})
    }
    console.log(this.state.products)
    this.setState({productCount})
    this.setState({loading:false})
  } else{
    window.alert('Marketplace contract not deployed to detected network')
  }
  
}



constructor(props){
  super(props)
  this.state={
    account: "",
    productCount :0,
    products:[],
    loading :true
  }

  this.createProduct = this.createProduct.bind(this)
  this.purchaseProduct = this.purchaseProduct.bind(this)
}

createProduct(name, price) {
this.setState({ loading: true })
this.state.marketplace.methods.Create_Product(name, price).send({ from: this.state.account })
.once('receipt', (receipt) => {
this.setState({ loading: false })
})}
purchaseProduct(id, price) {
  this.setState({ loading: true })
  this.state.marketplace.methods.Purchase_Product(id).send({ from: this.state.account, value: price })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
}

  render() {
    return (
      <div>
      <Navbar account={this.state.account}/>
      <Main createProduct={this.createProduct}
            products={this.state.products}
            purchaseProduct={this.purchaseProduct}
      />
      </div>
    );
  }
}

export default App;
