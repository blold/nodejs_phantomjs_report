

class App extends React.Component {

    render() {
        const data = [{
            name: 'Tanner Linsley1',
            age: 26,
            friend: {
              name: 'Jason Maurer',
              age: 23,
            }
          },{
            name: 'Tanner Linsley2',
            age: 26,
            friend: {
              name: 'Jason Maurer',
              age: 23,
            }
          },{
            name: 'Tanner Linsley3',
            age: 26,
            friend: {
              name: 'Jason Maurer',
              age: 23,
            }
          }];

          const columns = [{
            Header: 'Date',
            accessor: 'date' // String-based value accessors!
          }, {
            Header: 'Time',
            accessor: 'time',
            Cell: props => <span className='text-center'>{props.value}</span> // Custom cell components!
          }, {
            Header: 'Deal Code',
            accessor: 'code'
          },{
            Header: 'Type of Order',
            accessor: 'type'
          },{
            Header: 'Transaction Type',
            accessor: 'trans_type'
          },{
            Header: 'Trd Curr.',
            accessor: 'trd_cur'
          },{
            Header: 'Quantity',
            accessor: 'quan'
          },{
            Header: 'Dealing Price',
            accessor: 'd_price'
          },{
            Header: 'Dealing charges(incl. GST)',
            accessor: 'd_charge'
          },{
            Header: 'GST',
            accessor: 'gst'
          },{
            Header: 'Conv Rate',
            accessor: 'credit'
          },{
            Header: 'Credit/debit',
            accessor: 'balance'
          }]

          return(
              <div>
                <ReactTable
                        data={data}
                        columns={columns}
                    />
              </div>
          )

          
        }
    }

    ReactDOM.render(<App />, document.getElementById("tableApp"));