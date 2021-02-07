import React, {Component} from 'react';
class Main extends Component{

    constructor(props){
        super(props);
        this.CreateProduct = this.CreateProduct.bind(this);
    }
    CreateProduct(event){
        event.preventDefault()
        let productName= document.getElementById("productName").value;
        let productPrice= document.getElementById("productPrice").value;
        this.props.createProduct(productName, productPrice.toString())
        console.log(productName,productPrice)
    }
    render(){
        return(
            <div id="content">
            
            <h1> Add Product that you want to sell </h1>
                <form onSubmit={this.CreateProduct}>
                    <div className="form-group mr-sm-2">
                    <input id="productName" type='text'className='form-control' placeholder="Product Name"/>
                    </div>
                    <div className="form-group mr-sm-2">
                    <input id="productPrice" type='text'className='form-control' placeholder="Product Price"/> 
                    </div>
                    <div>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                    </div>
                </form>
                <p></p>
                <h1 style ={{padding : "20 px", align : "center"}}> Products to Sell </h1>
                <table className = 'table'>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Owner</th>
                        <th scope="col"></th>
                    </tr>
                    </thead>
                    <tbody id="productList">
                    {this.props.products.map((product,key)=>{
                        return(
                            <tr key={key}>
                                <th scope="row">{product.Product_id.toString()}</th>
                                <td>{product.Product_name}</td>
                                <td>{product.price.toString()} Eth</td>
                                <td>{product.owner}</td>
                                <td>{
                                    !product.purchased ? <button name={product.Product_id} value={product.price} onClick={(event)=>{
                                        this.props.purchaseProduct(event.target.name,event.target.value)
                                    }}> Buy </button> : <p>sold</p>
                                }</td>
                                </tr>

                        )

                    })}


                    </tbody>
                </table>

            </div>


        );
    }
}
export default Main;