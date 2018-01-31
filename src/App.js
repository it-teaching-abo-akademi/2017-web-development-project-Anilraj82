import React, { Component } from 'react';
import Portfolio from './Components/Potfolio'

class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        portfolios: [],
        showInput: false,
        portFolioName: '',
        addStock: false,
        stock: {
          name: '',
          unitValue: 0,
          quantity: 0,
        },
        activeId: 0,
      }

      this.addPortfolio = this.addPortfolio.bind(this)
      this.toggleItem = this.toggleItem.bind(this)
      this.updateName = this.updateName.bind(this)
      this.updateStock = this.updateStock.bind(this)
      this.createStock = this.createStock.bind(this)
      this.toggleStockForm = this.toggleStockForm.bind(this)
      this.removePortfolio = this.removePortfolio.bind(this)
      this.removeStock = this.removeStock.bind(this)
  }

  toggleItem() {
      this.setState({showInput: !this.state.showInput})
  }

  toggleStockForm(e) {
      this.setState({
          addStock: !this.state.addStock,
          activeId: e.target.getAttribute('data-id')
      })
  }

  updateStock(e) {
     let stock = this.state.stock
      stock[e.target.name] = e.target.value
      this.setState({stock: stock})
  }

  addPortfolio() {
      let portfolios = this.state.portfolios
      if(!this.state.portFolioName) {
         alert('Name of portfolio is required');
         return false
      }
      
      portfolios.push({name: this.state.portFolioName, stocks: []})
      this.setState({
          portfolios: portfolios,
          portFolioName: '',
          showInput: !this.state.showInput
      })

  }

  removeStock(e) {
      const stockId = e.target.getAttribute('data-id')
      const portFolioId = e.target.getAttribute('data-parent')
      let portFolios = this.state.portfolios
      portFolios[portFolioId].stocks.splice(stockId, 1)
      this.setState({ portfolios: portFolios })
  }

  updateName(e) {
      this.setState({portFolioName: e.target.value})
  }

  createStock(e) {
     const portFolioId = e.target.getAttribute('data-id')
      if(!this.state.stock.name || !this.state.stock.quantity || !this.state.stock.unitValue) {
         alert('Missing fields')
          return false
      }

     let portfolios = this.state.portfolios
      portfolios[portFolioId].stocks.push({
          name: this.state.stock.name,
          unitValue: this.state.stock.unitValue,
          quantity: this.state.stock.quantity,
      })
     this.setState({
         addStock: !this.state.addStock,
         portfolios: portfolios,
         stock: {name: '', unitValue: 0, quantity: 0}
     })
  }

  removePortfolio(e) {
    const portFolioId = e.target.getAttribute('data-id')
    let portfolios = this.state.portfolios
    portfolios.splice(portFolioId, 1)
    this.setState({portfolios: portfolios})
  }

  render() {
    return (
        <div className="container">
              <div className="col-xs-12">
                <h4 className="text-center text-info">STOCK PORTFOLIO MANAGEMENT SYSTEM </h4>
              </div>
              <div class="col-xs-12">
                {!this.state.showInput &&
                  <button type="btn" className="btn btn-success" onClick={this.toggleItem}>Add New Portfolio</button>
                }
                {this.state.showInput &&
                  <div className="row potfolio-row">
                        <div className="col-xs-6">
                          <input name="portfolio-name" className="form-control" placeholder="Enter portfolio name"
                                  value={this.state.portFolioName}
                                  onChange={e => this.updateName(e)}
                          />
                        </div>
                        <div className="col-xs-6">
                          <button type="button" className="btn btn-success" onClick={this.addPortfolio}>Create Portfolio </button>
                        </div>
                  </div>
                }

              </div>
          <div className="col-xs-12">
              {this.state.portfolios.map((portfolio,i) => {
                  return <Portfolio
                    key = {i}
                    dataId={i}
                    portfolio={portfolio}
                    stock={this.state.stock}
                    addStock={this.state.addStock}
                    showStockForm={this.toggleStockForm}
                    updateStock={this.updateStock}
                    createStock={this.createStock}
                    removePortfolio={this.removePortfolio}
                    activeId={this.state.activeId}
                    removeStock={this.removeStock}
                    />
              })}
          </div>



        </div>
    )
  }
}

export default App;
