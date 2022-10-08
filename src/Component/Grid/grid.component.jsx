import React from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


function Grid(params) {
  return (
    <div className="ag-theme-alpine" style={{height: '100%', width: '100%'}}>
      <AgGridReact
        columnDefs={params.data.column}
        rowData={params.Data.row}
      />
    </div>
  )
};

export default Grid;