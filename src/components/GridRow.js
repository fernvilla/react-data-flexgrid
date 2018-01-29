import React, { Component } from "react";

export default class GridRow extends Component {
  constructor() {
    super();

    this.state = { showSubcomponent: false };
  }

  onCheckboxClick = (e, data) => {
    e.stopPropagation();
    const { onRowSelect, onRowDeselect, handleCheckboxChange } = this.props;
    const action = e.target.checked ? onRowSelect : onRowDeselect;

    action(data);
    handleCheckboxChange(data.rowIndex);
  };

  renderSubcomponent(data) {
    const { showSubComponent } = this.state;
    const { subComponent } = this.props;

    if (!showSubComponent) return null;

    return subComponent(data);
  }

  toggleSubComponent() {
    this.setState({ showSubComponent: !this.state.showSubComponent });
  }

  render() {
    const { columns, data, allowRowSelection, selectedRows } = this.props;

    return (
      <div className="flexgrid-data-row" onClick={() => this.toggleSubComponent()}>
        <div className="flexgrid-data-wrapper">
          {allowRowSelection && (
            <span className="flexgrid-data-col">
              <input
                type="checkbox"
                onClick={e => this.onCheckboxClick(e, data)}
                checked={selectedRows.indexOf(data.rowIndex) > -1}
              />
            </span>
          )}

          {columns.map((column, i) => {
            const style = column.style || null;

            return (
              <span className="flexgrid-data-col" key={i} style={style}>
                {data[column.columnName]}
              </span>
            );
          })}
        </div>

        {this.renderSubcomponent(data)}
      </div>
    );
  }
}
