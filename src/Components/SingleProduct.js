import React from 'react';

const SingleProduct = (props) => {
    const {product_name, brand_name, address, price, date, image, discription} = props.product
    return (
        <div style={{boxSizing:'border-box', backgroundColor: '#232323',  fontSize:'.8rem'}} className="rounded  text-white px-2 py-2 m-2 single_product">
            <div className='d-flex'>
                <div className='p-2'>
                    <img style={{objectFit:'cover', width: '70px', height:'70px'}} className='img-fluid rounded' src={image} alt="" />
                </div>
                <div className="p-1">
                    <p className='m-0 fw-bold'>{product_name}</p>
                    <p className='m-0 text-secondary'>{brand_name}</p>
                    <p className='m-0 fw-bold'>$ {price}</p>
                </div>
            </div>
            <div className='d-flex justify-content-between text-secondary'>
                <div>
                <small>{address.state}</small> <br />
                <small>{address.city}</small>
                </div>
                <small>Date: {date.substr(0,10)}</small>
            </div>
            <span className='text-secondary'>{discription}</span>
        </div>
    );
};

export default SingleProduct;