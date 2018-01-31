import React from 'react'

const Portfolio = ({activeId, dataId, portfolio, addStock, showStockForm, stock, updateStock, createStock, removePortfolio, removeStock}) => (
    <div className="col-xs-12 col-sm-6 panel panel-info portfolio-div">
        <div className="panel-heading row">
            <div className="col-xs-3">
                <h4 className="text-info"> <b>{portfolio.name}</b></h4>
            </div>
            <div className="col-xs-3">

            </div>
            <div className="col-xs-3">

            </div>
            <div className="col-xs-3">
                <span data-id={dataId} onClick={e => removePortfolio(e)} className="remove-portfolio glyphicon glyphicon-remove pull-right"></span>
            </div>
        </div>
        <div className="panel-body">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Unit value</th>
                    <th>Quantity</th>
                    <th>Total Value</th>
                    <th>Select</th>
                </tr>
                </thead>
                <tbody>
                {portfolio.stocks && portfolio.stocks.map((stock,i) => {
                    return <tr key={i}>
                        <td>{stock.name}</td>
                        <td>{stock.unitValue}</td>
                        <td>{stock.quantity}</td>
                        <td>{stock.unitValue * stock.quantity}</td>
                        <td><span onClick={e => removeStock(e)} className="glyphicon glyphicon-remove remove-stock" data-id={i} data-parent={dataId} /></td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
        <div className="panel-footer">
            {!addStock &&
                <button type="button" data-id={dataId} onClick={e => showStockForm(e)} className="btn btn-success">Add Stock</button>
            }
            {addStock && activeId == dataId &&
                <div className="row stock-form">
                    <div className="col-xs-12">
                        <input type="text" className="form-control" name="name" value={stock.name} onChange={e => updateStock(e)} placeholder="Enter Symbol of Stock" />
                    </div>
                    <div className="col-xs-12">
                        <input className="form-control" type="number" name="unitValue" value={stock.unitValue} onChange={e => updateStock(e)} placeholder="Enter Unit value of Stock" />
                    </div>
                    <div className="col-xs-12">
                        <input className="form-control" type="number" name="quantity" value={stock.quantity} onChange={e => updateStock(e)} placeholder="Enter quantity of Stock" />
                    </div>
                    <div className="col-xs-12">
                        <button type="button" data-id={dataId} className="btn btn-success" onClick={e => createStock(e)}>Create Stock </button>
                    </div>
                </div>
            }
        </div>
    </div>
)

export default Portfolio

