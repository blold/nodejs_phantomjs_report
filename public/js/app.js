let http = {
    get: (url) => {
        let promise = new Promise((res, rej) => {
            $.ajax({
                type: 'GET',
                url: url,
                success: function(d){
                    res(d);
                },
                error: function(e){
                    alert('Data get error, ' + e);
                }
            })
        });
        return promise;
    },
    post: (url, d_in) => {
        let promise = new Promise((res, rej) => {
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(d_in),
                contentType: 'application/json; charset=utf-8',
                success: function(d){
                  console.log(d);
                  res(d);
                },
                error: function(e){
                    alert('Data post error, ' + e);
                }
            })
        })
        return promise;
    }
};

$('#reportBtn1').on('click', function(e){
    let identity = {name: 'Andy'};
    http.post('http://localhost:3000/report1', identity).then((d2) => {
        (d2.code == '200') ? 
            (window.location = window.location.origin + "/download/" + d2.r_N) : 
            (alert('Download failed!'))
    })
})

function popWd(url, win_n){
    n_w = window.open(url, win_n, 'height=500, width=1200');
    if (window.focus) {n_w.focus()};
    return false;
}

$('#reportBtn2').on('click', function(e){
    e.preventDefault();
    popWd('http://localhost:3000/table', 't11111');
})

$('#reportBtn3').on('click', function(e){
    let identity = {name: 'Andy'};
    http.post('http://localhost:3000/report2', identity).then((d2) => {
        // console.log('dddd: ' + d);    
        (d2.code == '200') ? 
                (window.location = window.location.origin + "/download/" + d2.r_N) : 
                (alert('Download failed!'))
    })
})

$(document).ready( function () {
    $('#inner_table1').DataTable( {
        "pageLength": 15,
        dom: 'Bfrtip',
        searching: false,
        buttons: [
            {
                extend: 'excel',
                text: 'Excel',
                className: 'dt_button_cus'
            },
            {
                extend: 'print',
                text: 'Print',
                className: 'dt_button_cus'
            }
        ],
        ajax: {
            "url": 'http://localhost:3000/tableData',
            "dataSrc": function (j) {
                if(j.code == '200'){
                    return j.data;
                }else {alert('Load data failed, ' + j.code)}
            }      
        },
        columns: [ 
            {"data": 'date'},
            {"data": 'time'},
            {"data": 'ac'},
            {"data": 'market'},
            {"data": 'dir'},
            {"data": 'quan'} ,
            {"data": 'price'},
            {"data": 'consi'},
            {"data": 'cost'},
            {"data": 'c_rate'},
            {"data": 'o_type'},
            {"data": 'settle'}, 
            {"data": 's_date'}, 
            {"data": 'o_id'}
        ]
    });
} );