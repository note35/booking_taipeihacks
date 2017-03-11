import React, { Component, PureComponent } from 'react';
import FontAwesome from 'react-fontawesome';

import LogItem from './TableItem';
import css from './Table'

export default class Table extends PureComponent {

  renderContent = ( loading = true, columns, detailColumns, source) => {
    if (loading) return <FontAwesome
        className={css.Loading}
        name='refresh'
        size='3x'
        spin
      />;

    const items = source.map((item, index) => {
      return <LogItem key={index} item={item} columns={columns} detailColumns={detailColumns} />
    });

    return items;
  }

  renderColumns = () => {
    const columns = this.props.columns.map( (column) => {
      return <span key={column.key} >{column.title}</span>
    })
    return columns;
  }

  render() {
    const { columns, detailColumns, source, isLoading } = this.props;
    return (
      <div className={css.Table}>
        <div className={css.Head}>
          {this.renderColumns()}
        </div>
        <div className={css.Body}>
          {this.renderContent( isLoading, columns, detailColumns, source)}
        </div>
      </div>
    );
  }
}
